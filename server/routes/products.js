/**
 * 📦 Rotas de Produtos
 * 
 * GET /api/products - Listar todos os produtos
 * GET /api/products/:id - Detalhes de um produto
 * GET /api/products/category/:category - Produtos por categoria
 * GET /api/products/search - Buscar produtos
 */

import express from 'express';
import { getDb } from '../config/database.js';

const router = express.Router();

/**
 * GET /api/products
 * Lista todos os produtos com paginação e filtros
 */
router.get('/', (req, res) => {
    try {
        const db = getDb();
        const {
            page = 1,
            limit = 20,
            category,
            minPrice,
            maxPrice,
            inStock,
            sortBy = 'id',
            order = 'asc'
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        // Filtros
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (minPrice) {
            query += ' AND price >= ?';
            params.push(parseFloat(minPrice));
        }

        if (maxPrice) {
            query += ' AND price <= ?';
            params.push(parseFloat(maxPrice));
        }

        if (inStock !== undefined) {
            query += ' AND in_stock = ?';
            params.push(inStock === 'true' ? 1 : 0);
        }

        // Ordenação segura
        const allowedSortFields = ['id', 'name', 'price', 'rating', 'created_at'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'id';
        const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

        query += ` ORDER BY ${sortField} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), offset);

        const products = db.prepare(query).all(...params);

        // Total para paginação
        let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        const countParams = params.slice(0, -2); // Remove limit e offset

        if (category) countParams.length > 0; // Mantém filtros

        const { total } = db.prepare('SELECT COUNT(*) as total FROM products').get();

        // Parse JSON fields
        const parsedProducts = products.map(product => ({
            ...product,
            sizes: product.sizes ? JSON.parse(product.sizes) : [],
            colors: product.colors ? JSON.parse(product.colors) : [],
            inStock: Boolean(product.in_stock)
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
            error: 'Erro ao buscar produtos'
        });
    }
});

/**
 * GET /api/products/categories
 * Lista todas as categorias disponíveis
 */
router.get('/categories', (req, res) => {
    try {
        const db = getDb();
        const categories = db.prepare(`
            SELECT DISTINCT category, COUNT(*) as count 
            FROM products 
            GROUP BY category 
            ORDER BY category
        `).all();

        res.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar categorias'
        });
    }
});

/**
 * GET /api/products/search
 * Busca produtos por nome ou descrição
 */
router.get('/search', (req, res) => {
    try {
        const { q, limit = 10 } = req.query;

        if (!q || q.length < 2) {
            return res.status(400).json({
                success: false,
                error: 'Termo de busca deve ter pelo menos 2 caracteres'
            });
        }

        const db = getDb();
        const searchTerm = `%${q}%`;

        const products = db.prepare(`
            SELECT * FROM products 
            WHERE name LIKE ? OR description LIKE ?
            LIMIT ?
        `).all(searchTerm, searchTerm, parseInt(limit));

        const parsedProducts = products.map(product => ({
            ...product,
            sizes: product.sizes ? JSON.parse(product.sizes) : [],
            colors: product.colors ? JSON.parse(product.colors) : [],
            inStock: Boolean(product.in_stock)
        }));

        res.json({
            success: true,
            data: parsedProducts
        });

    } catch (error) {
        console.error('Erro na busca:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar produtos'
        });
    }
});

/**
 * GET /api/products/:id
 * Detalhes de um produto específico
 */
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const db = getDb();

        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(parseInt(id));

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Produto não encontrado'
            });
        }

        const parsedProduct = {
            ...product,
            sizes: product.sizes ? JSON.parse(product.sizes) : [],
            colors: product.colors ? JSON.parse(product.colors) : [],
            inStock: Boolean(product.in_stock)
        };

        res.json({
            success: true,
            data: parsedProduct
        });

    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar produto'
        });
    }
});

export default router;
