/**
 * ⏱️ Rate Limiter - Proteção contra DDoS e Brute Force
 * 
 * DECISÕES DE SEGURANÇA:
 * 1. 100 requests/15min para rotas gerais
 * 2. 5 requests/15min para login (evita brute force de senhas)
 * 3. Armazena em memória (ideal para dev, usar Redis em produção)
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter geral - 100 requests por 15 minutos
 */
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo de 100 requests por IP
    message: {
        success: false,
        error: 'Muitas requisições. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true, // Retorna info de rate limit nos headers
    legacyHeaders: false
});

/**
 * Rate limiter para autenticação - 5 tentativas por 15 minutos
 * Mais restritivo para evitar brute force de senhas
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo de 5 tentativas
    message: {
        success: false,
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
        retryAfter: 15 * 60
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Não conta requests bem-sucedidos
});

/**
 * Rate limiter para API de admin - 50 requests por minuto
 */
export const adminLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 50,
    message: {
        success: false,
        error: 'Rate limit excedido para operações admin.',
        retryAfter: 60
    },
    standardHeaders: true,
    legacyHeaders: false
});
