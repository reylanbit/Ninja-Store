/**
 * 🔑 Rotas de Autenticação
 * 
 * POST /api/auth/register - Registrar novo usuário
 * POST /api/auth/login - Login
 * POST /api/auth/logout - Logout
 * GET /api/auth/me - Dados do usuário atual
 * POST /api/auth/refresh - Renovar token
 */

import express from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../config/database.js';
import {
    generateToken,
    generateRefreshToken,
    setTokenCookie,
    clearTokenCookie,
    authenticate
} from '../middleware/auth.js';
import { validate, registerSchema, loginSchema } from '../middleware/validator.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Registra um novo usuário
 */
router.post('/register', validate(registerSchema), async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const db = getDb();

        // Verifica se email já existe
        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'Este email já está cadastrado'
            });
        }

        // Hash da senha com salt de 12 rounds (seguro e performático)
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insere usuário
        const result = db.prepare(`
            INSERT INTO users (email, password, name) VALUES (?, ?, ?)
        `).run(email, hashedPassword, name);

        const user = {
            id: result.lastInsertRowid,
            email,
            name,
            role: 'customer'
        };

        // Gera tokens
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Configura cookie
        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: {
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                refreshToken
            }
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao registrar usuário'
        });
    }
});

/**
 * POST /api/auth/login
 * Login do usuário
 */
router.post('/login', authLimiter, validate(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = getDb();

        // Busca usuário
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Email ou senha incorretos'
            });
        }

        // Verifica senha
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                error: 'Email ou senha incorretos'
            });
        }

        // Gera tokens
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);

        // Configura cookie
        setTokenCookie(res, token);

        res.json({
            success: true,
            message: 'Login realizado com sucesso',
            data: {
                user: { id: user.id, email: user.email, name: user.name, role: user.role },
                token,
                refreshToken
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao fazer login'
        });
    }
});

/**
 * POST /api/auth/logout
 * Logout do usuário
 */
router.post('/logout', (req, res) => {
    clearTokenCookie(res);
    res.json({
        success: true,
        message: 'Logout realizado com sucesso'
    });
});

/**
 * GET /api/auth/me
 * Retorna dados do usuário autenticado
 */
router.get('/me', authenticate, (req, res) => {
    res.json({
        success: true,
        data: {
            user: req.user
        }
    });
});

export default router;
