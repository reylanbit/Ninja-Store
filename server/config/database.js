/**
 * 🗄️ Configuração do Banco de Dados SQLite
 * 
 * DECISÕES TÉCNICAS:
 * 1. SQLite: Zero configuração, arquivo único, perfeito para desenvolvimento
 * 2. better-sqlite3: Síncrono e mais rápido que alternativas async
 * 3. Foreign Keys: Habilitado para integridade referencial
 * 
 * SEGURANÇA:
 * - Prepared statements previnem SQL injection
 * - Senhas são hasheadas (nunca armazenadas em texto plano)
 */

import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', 'data', 'ninja-store.db');

let db;

export function getDb() {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL'); // Melhor performance
        db.pragma('foreign_keys = ON');   // Integridade referencial
    }
    return db;
}

export async function initDatabase() {
    const db = getDb();

    // ===========================
    // TABELA: users (Usuários)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT DEFAULT 'customer' CHECK(role IN ('customer', 'admin')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ===========================
    // TABELA: products (Produtos)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            full_description TEXT,
            category TEXT NOT NULL,
            image TEXT,
            sizes TEXT, -- JSON array
            colors TEXT, -- JSON array
            rating REAL DEFAULT 0,
            reviews_count INTEGER DEFAULT 0,
            in_stock INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // ===========================
    // TABELA: carts (Carrinhos)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS carts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            status TEXT DEFAULT 'active' CHECK(status IN ('active', 'completed', 'abandoned')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    // ===========================
    // TABELA: cart_items (Itens do Carrinho)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS cart_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cart_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            size TEXT,
            color TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
    `);

    // ===========================
    // TABELA: orders (Pedidos)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            total REAL NOT NULL,
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
            shipping_address TEXT,
            payment_method TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `);

    // ===========================
    // TABELA: order_items (Itens do Pedido)
    // ===========================
    db.exec(`
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL,
            size TEXT,
            color TEXT,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);

    // ===========================
    // CRIAR ADMIN PADRÃO
    // ===========================
    const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 12);
        db.prepare(`
            INSERT INTO users (email, password, name, role) 
            VALUES (?, ?, ?, ?)
        `).run('admin@ninjastore.com', hashedPassword, 'Administrador', 'admin');

        console.log('👤 Admin padrão criado: admin@ninjastore.com / admin123');
    }

    console.log('📦 Tabelas do banco de dados criadas/verificadas');
    return db;
}

export default { getDb, initDatabase };
