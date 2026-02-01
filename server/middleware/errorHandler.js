/**
 * 🚨 Error Handler Global
 * 
 * Centraliza tratamento de erros para evitar vazamento de informações
 * sensíveis e fornecer respostas consistentes.
 */

export function errorHandler(err, req, res, next) {
    console.error('❌ Erro:', err);

    // Erro de validação do JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            error: 'JSON inválido no corpo da requisição'
        });
    }

    // Erro de banco de dados
    if (err.code && err.code.startsWith('SQLITE')) {
        return res.status(500).json({
            success: false,
            error: 'Erro no banco de dados'
        });
    }

    // Erro genérico
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Erro interno do servidor'
        : err.message;

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
}
