/**
 * 🛒 Rotas do Carrinho de Compras
 * 
 * GET /api/cart - Obter carrinho do usuário
 * POST /api/cart/items - Adicionar item ao carrinho
 * PUT /api/cart/items/:id - Atualizar quantidade
 * DELETE /api/cart/items/:id - Remover item
 * DELETE /api/cart - Limpar carrinho
 * POST /api/cart/checkout - Finalizar compra
 */

import express from 'express';
import { getDb } from '../config/database.js';
import { authenticate } from '../middleware/auth.js';
import {
    validate,
    addToCartSchema,
    updateCartItemSchema,
    checkoutSchema
} from '../middleware/validator.js';

const router = express.Router();

// Todas as rotas do carrinho requerem autenticação
router.use(authenticate);

/**
 * Helper: Obtém ou cria carrinho ativo do usuário
 */
function getOrCreateCart(userId) {
    const db = getDb();

    let cart = db.prepare(`
        SELECT * FROM carts WHERE user_id = ? AND status = 'active'
    `).get(userId);

    if (!cart) {
        const result = db.prepare(`
            INSERT INTO carts (user_id) VALUES (?)
        `).run(userId);

        cart = { id: result.lastInsertRowid, user_id: userId, status: 'active' };
    }

    return cart;
}

/**
 * Helper: Calcula totais do carrinho
 */
function calculateCartTotals(cartId) {
    const db = getDb();

    const items = db.prepare(`
        SELECT ci.*, p.name, p.price, p.image 
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
    `).all(cartId);

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return {
        items: items.map(item => ({
            id: item.id,
            productId: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.image,
            total: item.price * item.quantity
        })),
        subtotal,
        itemCount,
        shipping: subtotal >= 200 ? 0 : 15.90, // Frete grátis acima de R$200
        total: subtotal + (subtotal >= 200 ? 0 : 15.90)
    };
}

/**
 * GET /api/cart
 * Retorna o carrinho do usuário
 */
router.get('/', (req, res) => {
    try {
        const cart = getOrCreateCart(req.user.id);
        const cartData = calculateCartTotals(cart.id);

        res.json({
            success: true,
            data: {
                cartId: cart.id,
                ...cartData
            }
        });

    } catch (error) {
        console.error('Erro ao obter carrinho:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao obter carrinho'
        });
    }
});

/**
 * POST /api/cart/items
 * Adiciona item ao carrinho
 */
router.post('/items', validate(addToCartSchema), (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const db = getDb();

        // Verifica se produto existe e está em estoque
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Produto não encontrado'
            });
        }

        if (!product.in_stock) {
            return res.status(400).json({
                success: false,
                error: 'Produto fora de estoque'
            });
        }

        const cart = getOrCreateCart(req.user.id);

        // Verifica se item já existe no carrinho
        const existingItem = db.prepare(`
            SELECT * FROM cart_items 
            WHERE cart_id = ? AND product_id = ? AND size IS ? AND color IS ?
        `).get(cart.id, productId, size || null, color || null);

        if (existingItem) {
            // Atualiza quantidade
            db.prepare(`
                UPDATE cart_items SET quantity = quantity + ? WHERE id = ?
            `).run(quantity, existingItem.id);
        } else {
            // Insere novo item
            db.prepare(`
                INSERT INTO cart_items (cart_id, product_id, quantity, size, color)
                VALUES (?, ?, ?, ?, ?)
            `).run(cart.id, productId, quantity, size || null, color || null);
        }

        const cartData = calculateCartTotals(cart.id);

        res.status(201).json({
            success: true,
            message: 'Item adicionado ao carrinho',
            data: {
                cartId: cart.id,
                ...cartData
            }
        });

    } catch (error) {
        console.error('Erro ao adicionar item:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao adicionar item ao carrinho'
        });
    }
});

/**
 * PUT /api/cart/items/:id
 * Atualiza quantidade de um item
 */
router.put('/items/:id', validate(updateCartItemSchema), (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const db = getDb();

        const cart = getOrCreateCart(req.user.id);

        // Verifica se item pertence ao carrinho do usuário
        const item = db.prepare(`
            SELECT * FROM cart_items WHERE id = ? AND cart_id = ?
        `).get(parseInt(id), cart.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                error: 'Item não encontrado no carrinho'
            });
        }

        db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, parseInt(id));

        const cartData = calculateCartTotals(cart.id);

        res.json({
            success: true,
            message: 'Quantidade atualizada',
            data: {
                cartId: cart.id,
                ...cartData
            }
        });

    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar item'
        });
    }
});

/**
 * DELETE /api/cart/items/:id
 * Remove item do carrinho
 */
router.delete('/items/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = getDb();

        const cart = getOrCreateCart(req.user.id);

        const result = db.prepare(`
            DELETE FROM cart_items WHERE id = ? AND cart_id = ?
        `).run(parseInt(id), cart.id);

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Item não encontrado no carrinho'
            });
        }

        const cartData = calculateCartTotals(cart.id);

        res.json({
            success: true,
            message: 'Item removido do carrinho',
            data: {
                cartId: cart.id,
                ...cartData
            }
        });

    } catch (error) {
        console.error('Erro ao remover item:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao remover item'
        });
    }
});

/**
 * DELETE /api/cart
 * Limpa o carrinho
 */
router.delete('/', (req, res) => {
    try {
        const db = getDb();
        const cart = getOrCreateCart(req.user.id);

        db.prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cart.id);

        res.json({
            success: true,
            message: 'Carrinho limpo',
            data: {
                cartId: cart.id,
                items: [],
                subtotal: 0,
                itemCount: 0,
                shipping: 15.90,
                total: 15.90
            }
        });

    } catch (error) {
        console.error('Erro ao limpar carrinho:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao limpar carrinho'
        });
    }
});

/**
 * POST /api/cart/checkout
 * Finaliza a compra
 */
router.post('/checkout', validate(checkoutSchema), (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const db = getDb();

        const cart = getOrCreateCart(req.user.id);
        const cartData = calculateCartTotals(cart.id);

        if (cartData.items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Carrinho está vazio'
            });
        }

        // Cria o pedido
        const orderResult = db.prepare(`
            INSERT INTO orders (user_id, total, shipping_address, payment_method)
            VALUES (?, ?, ?, ?)
        `).run(
            req.user.id,
            cartData.total,
            JSON.stringify(shippingAddress),
            paymentMethod
        );

        const orderId = orderResult.lastInsertRowid;

        // Cria itens do pedido
        const insertOrderItem = db.prepare(`
            INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        for (const item of cartData.items) {
            insertOrderItem.run(
                orderId,
                item.productId,
                item.quantity,
                item.price,
                item.size || null,
                item.color || null
            );
        }

        // Marca carrinho como completado
        db.prepare(`UPDATE carts SET status = 'completed' WHERE id = ?`).run(cart.id);

        // Limpa itens do carrinho
        db.prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cart.id);

        res.status(201).json({
            success: true,
            message: 'Pedido realizado com sucesso!',
            data: {
                orderId,
                total: cartData.total,
                itemCount: cartData.itemCount,
                status: 'pending',
                paymentMethod
            }
        });

    } catch (error) {
        console.error('Erro no checkout:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao processar pedido'
        });
    }
});

export default router;
