/**
 * ✅ Validação de Dados com Zod
 * 
 * DECISÕES TÉCNICAS:
 * 1. Zod: Type-safe, mensagens de erro claras, zero dependências externas
 * 2. Validação no servidor: NUNCA confie apenas no frontend
 * 3. Sanitização: Remove/escapa caracteres perigosos
 */

import { z } from 'zod';

// ===========================
// SCHEMAS DE AUTENTICAÇÃO
// ===========================

export const registerSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .max(255, 'Email muito longo'),
    password: z.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(100, 'Senha muito longa'),
    name: z.string()
        .min(2, 'Nome deve ter no mínimo 2 caracteres')
        .max(100, 'Nome muito longo')
        .transform(val => val.trim())
});

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'Senha é obrigatória')
});

// ===========================
// SCHEMAS DE PRODUTO
// ===========================

export const productSchema = z.object({
    name: z.string()
        .min(3, 'Nome deve ter no mínimo 3 caracteres')
        .max(200, 'Nome muito longo'),
    price: z.number()
        .positive('Preço deve ser positivo')
        .max(999999, 'Preço muito alto'),
    description: z.string()
        .max(500, 'Descrição muito longa')
        .optional(),
    fullDescription: z.string()
        .max(2000, 'Descrição detalhada muito longa')
        .optional(),
    category: z.string()
        .min(2, 'Categoria inválida')
        .max(50, 'Categoria muito longa'),
    image: z.string().optional(),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.object({
        name: z.string(),
        code: z.string()
    })).optional(),
    inStock: z.boolean().optional().default(true)
});

export const updateProductSchema = productSchema.partial();

// ===========================
// SCHEMAS DE CARRINHO
// ===========================

export const addToCartSchema = z.object({
    productId: z.number().int().positive('ID do produto inválido'),
    quantity: z.number()
        .int()
        .positive('Quantidade deve ser positiva')
        .max(99, 'Quantidade máxima é 99')
        .optional()
        .default(1),
    size: z.string().optional(),
    color: z.string().optional()
});

export const updateCartItemSchema = z.object({
    quantity: z.number()
        .int()
        .positive('Quantidade deve ser positiva')
        .max(99, 'Quantidade máxima é 99')
});

// ===========================
// SCHEMAS DE CHECKOUT
// ===========================

export const checkoutSchema = z.object({
    shippingAddress: z.object({
        street: z.string().min(5, 'Endereço inválido'),
        number: z.string().min(1, 'Número é obrigatório'),
        complement: z.string().optional(),
        neighborhood: z.string().min(2, 'Bairro inválido'),
        city: z.string().min(2, 'Cidade inválida'),
        state: z.string().length(2, 'Estado deve ter 2 caracteres'),
        zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
    }),
    paymentMethod: z.enum(['pix', 'credit_card', 'boleto'], {
        errorMap: () => ({ message: 'Método de pagamento inválido' })
    })
});

// ===========================
// MIDDLEWARE DE VALIDAÇÃO
// ===========================

/**
 * Cria um middleware de validação para um schema Zod
 */
export function validate(schema) {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                const errors = result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                return res.status(400).json({
                    success: false,
                    error: 'Dados inválidos',
                    details: errors
                });
            }

            // Substitui body com dados validados e sanitizados
            req.body = result.data;
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Erro na validação'
            });
        }
    };
}
