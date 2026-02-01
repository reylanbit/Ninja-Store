/**
 * 👑 Rotas de Administração
 * 
 * Dashboard e CRUD de produtos, pedidos e usuários
 * Todas as rotas requerem autenticação de admin
 */

import express from 'express';
import { getDb } from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { validate, productSchema, updateProductSchema } from '../middleware/validator.js';
import { adminLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Todas as rotas admin requerem autenticação e privilégios de admin
router.use(authenticate);
router.use(requireAdmin);
router.use(adminLimiter);

// ===========================
// DASHBOARD
// ===========================

/**
 * GET /api/admin/dashboard
 * Métricas e estatísticas do dashboard
 */
router.get('/dashboard', (req, res) => {
    try {
        const db = getDb();

        // Total de produtos
        const { totalProducts } = db.prepare('SELECT COUNT(*) as totalProducts FROM products').get();

        // Produtos em estoque vs fora
        const { inStock } = db.prepare('SELECT COUNT(*) as inStock FROM products WHERE in_stock = 1').get();
        const outOfStock = totalProducts - inStock;

        // Total de usuários
        const { totalUsers } = db.prepare('SELECT COUNT(*) as totalUsers FROM users WHERE role = "customer"').get();

        // Total de pedidos
        const { totalOrders } = db.prepare('SELECT COUNT(*) as totalOrders FROM orders').get();

        // Pedidos por status
        const ordersByStatus = db.prepare(`
            SELECT status, COUNT(*) as count 
            FROM orders 
            GROUP BY status
        `).all();

        // Receita total
        const { totalRevenue } = db.prepare(`
            SELECT COALESCE(SUM(total), 0) as totalRevenue 
            FROM orders 
            WHERE status IN ('paid', 'shipped', 'delivered')
        `).get();

        // Pedidos recentes (últimos 10)
        const recentOrders = db.prepare(`
            SELECT o.id, o.total, o.status, o.created_at, u.name as customerName, u.email
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
            LIMIT 10
        `).all();

        // Produtos mais vendidos
        const topProducts = db.prepare(`
            SELECT p.id, p.name, p.price, SUM(oi.quantity) as totalSold
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            GROUP BY p.id
            ORDER BY totalSold DESC
            LIMIT 5
        `).all();

        res.json({
            success: true,
            data: {
                overview: {
                    totalProducts,
                    inStock,
                    outOfStock,
                    totalUsers,
                    totalOrders,
                    totalRevenue
                },
                ordersByStatus,
                recentOrders,
                topProducts
            }
        });

    } catch (error) {
        console.error('Erro no dashboard:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao carregar dashboard'
        });
    }
});

// ===========================
// CRUD DE PRODUTOS
// ===========================

/**
 * GET /api/admin/products
 * Lista todos os produtos (com mais detalhes para admin)
 */
router.get('/products', (req, res) => {
    try {
        const db = getDb();
        const { page = 1, limit = 20 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const products = db.prepare(`
            SELECT * FROM products 
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `).all(parseInt(limit), offset);

        const { total } = db.prepare('SELECT COUNT(*) as total FROM products').get();

        const parsedProducts = products.map(p => ({
            ...p,
            sizes: p.sizes ? JSON.parse(p.sizes) : [],
            colors: p.colors ? JSON.parse(p.colors) : [],
            inStock: Boolean(p.in_stock)
        }));

        res.json({
            success: true,
            data: {
                products: parsedProducts,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });

    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar produtos'
        });
    }
});

/**
 * POST /api/admin/products
 * Cria um novo produto
 */
router.post('/products', validate(productSchema), (req, res) => {
    try {
        const { name, price, description, fullDescription, category, image, sizes, colors, inStock } = req.body;
        const db = getDb();

        const result = db.prepare(`
            INSERT INTO products (name, price, description, full_description, category, image, sizes, colors, in_stock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            name,
            price,
            description || null,
            fullDescription || null,
            category,
            image || null,
            sizes ? JSON.stringify(sizes) : null,
            colors ? JSON.stringify(colors) : null,
            inStock ? 1 : 0
        );

        res.status(201).json({
            success: true,
            message: 'Produto criado com sucesso',
            data: {
                id: result.lastInsertRowid,
                name,
                price,
                category
            }
        });

    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao criar produto'
        });
    }
});

/**
 * PUT /api/admin/products/:id
 * Atualiza um produto
 */
router.put('/products/:id', validate(updateProductSchema), (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const db = getDb();

        // Verifica se produto existe
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(parseInt(id));

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Produto não encontrado'
            });
        }

        // Monta query dinâmica
        const fields = [];
        const values = [];

        if (updates.name !== undefined) { fields.push('name = ?'); values.push(updates.name); }
        if (updates.price !== undefined) { fields.push('price = ?'); values.push(updates.price); }
        if (updates.description !== undefined) { fields.push('description = ?'); values.push(updates.description); }
        if (updates.fullDescription !== undefined) { fields.push('full_description = ?'); values.push(updates.fullDescription); }
        if (updates.category !== undefined) { fields.push('category = ?'); values.push(updates.category); }
        if (updates.image !== undefined) { fields.push('image = ?'); values.push(updates.image); }
        if (updates.sizes !== undefined) { fields.push('sizes = ?'); values.push(JSON.stringify(updates.sizes)); }
        if (updates.colors !== undefined) { fields.push('colors = ?'); values.push(JSON.stringify(updates.colors)); }
        if (updates.inStock !== undefined) { fields.push('in_stock = ?'); values.push(updates.inStock ? 1 : 0); }

        if (fields.length > 0) {
            fields.push('updated_at = CURRENT_TIMESTAMP');
            values.push(parseInt(id));

            db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...values);
        }

        res.json({
            success: true,
            message: 'Produto atualizado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar produto'
        });
    }
});

/**
 * DELETE /api/admin/products/:id
 * Remove um produto
 */
router.delete('/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = getDb();

        const result = db.prepare('DELETE FROM products WHERE id = ?').run(parseInt(id));

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Produto não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Produto removido com sucesso'
        });

    } catch (error) {
        console.error('Erro ao remover produto:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao remover produto'
        });
    }
});

// ===========================
// GERENCIAMENTO DE PEDIDOS
// ===========================

/**
 * GET /api/admin/orders
 * Lista todos os pedidos
 */
router.get('/orders', (req, res) => {
    try {
        const db = getDb();
        const { page = 1, limit = 20, status } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let query = `
            SELECT o.*, u.name as customerName, u.email as customerEmail
            FROM orders o
            JOIN users u ON o.user_id = u.id
        `;
        const params = [];

        if (status) {
            query += ' WHERE o.status = ?';
            params.push(status);
        }

        query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), offset);

        const orders = db.prepare(query).all(...params);

        // Busca itens de cada pedido
        const getOrderItems = db.prepare(`
            SELECT oi.*, p.name as productName, p.image
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `);

        const ordersWithItems = orders.map(order => ({
            ...order,
            shippingAddress: order.shipping_address ? JSON.parse(order.shipping_address) : null,
            items: getOrderItems.all(order.id)
        }));

        const { total } = db.prepare('SELECT COUNT(*) as total FROM orders').get();

        res.json({
            success: true,
            data: {
                orders: ordersWithItems,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });

    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar pedidos'
        });
    }
});

/**
 * PUT /api/admin/orders/:id/status
 * Atualiza status do pedido
 */
router.put('/orders/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const db = getDb();

        const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Status inválido'
            });
        }

        const result = db.prepare(`
            UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        `).run(status, parseInt(id));

        if (result.changes === 0) {
            return res.status(404).json({
                success: false,
                error: 'Pedido não encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Status atualizado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar status'
        });
    }
});

// ===========================
// GERENCIAMENTO DE USUÁRIOS
// ===========================

/**
 * GET /api/admin/users
 * Lista todos os usuários
 */
router.get('/users', (req, res) => {
    try {
        const db = getDb();
        const { page = 1, limit = 20 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);

        const users = db.prepare(`
            SELECT id, email, name, role, created_at 
            FROM users 
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `).all(parseInt(limit), offset);

        // Conta pedidos de cada usuário
        const countOrders = db.prepare('SELECT COUNT(*) as count FROM orders WHERE user_id = ?');

        const usersWithStats = users.map(user => ({
            ...user,
            ordersCount: countOrders.get(user.id).count
        }));

        const { total } = db.prepare('SELECT COUNT(*) as total FROM users').get();

        res.json({
            success: true,
            data: {
                users: usersWithStats,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            }
        });

    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao listar usuários'
        });
    }
});

export default router;
