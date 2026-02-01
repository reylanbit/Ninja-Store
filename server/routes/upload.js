import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        // Garantir que diretório existe
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Nome único para evitar colisão
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Apenas imagens (jpeg, jpg, png, webp) são permitidas!'));
    }
});

/**
 * POST /api/upload
 * Upload de imagem única
 * Requer autenticação de admin
 */
router.post('/', requireAdmin, (req, res) => {
    const uploadSingle = upload.single('image');

    uploadSingle(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Erro do Multer (ex: tamanho do arquivo)
            return res.status(400).json({ success: false, error: err.message });
        } else if (err) {
            // Outro erro
            return res.status(400).json({ success: false, error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Nenhum arquivo enviado.' });
        }

        // URL relativa que será servida estaticamente
        // Nota: O frontend deve prefixar com o domínio da API se estiver em domínios diferentes,
        // mas aqui estamos no mesmo domínio/proxy, ou servindo via API url.
        // Vamos retornar o caminho absoluto da URL: http://localhost:3001/uploads/filename
        // Ou melhor, relativo: /uploads/filename, e o frontend decide como exibir.
        const imageUrl = `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            imageUrl: imageUrl
        });
    });
});

export default router;
