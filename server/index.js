/**
 * 🔐 Ninja Store - Backend API Server
 * 
 * DECISÕES DE SEGURANÇA:
 * 1. Helmet: Configura headers HTTP seguros (XSS, MIME sniffing, etc.)
 * 2. CORS: Origem controlada para evitar ataques cross-origin
 * 3. Rate Limiting: 100 requests/15min por IP para evitar DDoS/brute force
 * 4. JSON Body Limit: 10kb para evitar payload attacks
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';

// Import middleware
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import database
import { initDatabase } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ===========================
// SEGURANÇA: Configurações
// ===========================

// Helmet: Headers HTTP seguros
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS: Permitir apenas o frontend local
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting: Proteção contra DDoS
app.use(rateLimiter);

// Body Parsing com limite de tamanho
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Cookie Parser para JWT em cookies
app.use(cookieParser());

// Servir arquivos estáticos (imagens de produtos)
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// ===========================
// ROTAS DA API
// ===========================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: '🍥 Ninja Store API está funcionando!'
    });
});

// Rotas públicas e autenticadas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

// ===========================
// ERROR HANDLING
// ===========================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Rota não encontrada',
        path: req.originalUrl
    });
});

// Global Error Handler
app.use(errorHandler);

// ===========================
// INICIALIZAÇÃO
// ===========================

async function startServer() {
    try {
        // Inicializar banco de dados
        await initDatabase();
        console.log('✅ Banco de dados inicializado');

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════════╗
║     🍥 NINJA STORE API SERVER 🍥          ║
╠═══════════════════════════════════════════╣
║  Servidor rodando em: http://localhost:${PORT}  ║
║  Health Check: http://localhost:${PORT}/api/health ║
╚═══════════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
}

startServer();

export default app;
