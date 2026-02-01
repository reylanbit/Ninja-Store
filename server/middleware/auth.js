/**
 * 🔐 Middleware de Autenticação JWT
 * 
 * DECISÕES DE SEGURANÇA:
 * 1. JWT em cookies httpOnly: Previne XSS (JavaScript não acessa)
 * 2. Token expira em 24h: Limita janela de ataque
 * 3. Refresh token: 7 dias, permite renovação sem re-login
 * 4. Secret forte: Deve ser variável de ambiente em produção
 */

import jwt from 'jsonwebtoken';
import { getDb } from '../config/database.js';

// ⚠️ Em produção, usar variável de ambiente!
const JWT_SECRET = process.env.JWT_SECRET || 'ninja-store-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

/**
 * Gera um token JWT
 */
export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

/**
 * Gera um refresh token
 */
export function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, type: 'refresh' },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
}

/**
 * Middleware: Verifica se o usuário está autenticado
 */
export function authenticate(req, res, next) {
    try {
        // Tenta pegar token do header Authorization ou do cookie
        let token = req.cookies?.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Token de autenticação não fornecido'
            });
        }

        // Verifica e decodifica o token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Busca o usuário no banco
        const db = getDb();
        const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Usuário não encontrado'
            });
        }

        // Adiciona usuário ao request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expirado',
                code: 'TOKEN_EXPIRED'
            });
        }

        return res.status(401).json({
            success: false,
            error: 'Token inválido'
        });
    }
}

/**
 * Middleware: Verifica se o usuário é admin
 */
export function requireAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Não autenticado'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Acesso negado. Requer privilégios de administrador.'
        });
    }

    next();
}

/**
 * Configura cookies seguros para o token
 */
export function setTokenCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,      // Não acessível via JavaScript
        secure: process.env.NODE_ENV === 'production', // HTTPS em produção
        sameSite: 'lax',     // Proteção CSRF
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });
}

export function clearTokenCookie(res) {
    res.clearCookie('token');
}
