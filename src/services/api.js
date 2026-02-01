/**
 * 🌐 Cliente API para Frontend
 * 
 * DECISÕES TÉCNICAS:
 * 1. Fetch nativo: Sem dependências externas
 * 2. Interceptors: Token automático em todas as requisições
 * 3. Error handling: Tratamento centralizado de erros
 * 4. Type hints: JSDoc para autocompletar
 */

const API_BASE_URL = 'http://localhost:3001/api';

// Token armazenado em memória (mais seguro que localStorage para tokens)
let authToken = localStorage.getItem('ninja-token') || null;

/**
 * Configura o token de autenticação
 */
export function setAuthToken(token) {
    authToken = token;
    if (token) {
        localStorage.setItem('ninja-token', token);
    } else {
        localStorage.removeItem('ninja-token');
    }
}

/**
 * Obtém o token atual
 */
export function getAuthToken() {
    return authToken;
}

/**
 * Cliente HTTP base
 */
async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            ...options.headers
        },
        credentials: 'include', // Envia cookies
        ...options
    };

    if (options.body && typeof options.body === 'object') {
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
            config.body = options.body;
        } else {
            config.body = JSON.stringify(options.body);
        }
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            // Token expirado - limpa autenticação
            if (response.status === 401 && data.code === 'TOKEN_EXPIRED') {
                setAuthToken(null);
                window.dispatchEvent(new CustomEvent('auth:expired'));
            }

            throw {
                status: response.status,
                message: data.error || 'Erro desconhecido',
                details: data.details
            };
        }

        return data;

    } catch (error) {
        if (error.status) throw error;

        throw {
            status: 0,
            message: 'Erro de conexão. Verifique se o servidor está rodando.',
            originalError: error
        };
    }
}

// ===========================
// API DE AUTENTICAÇÃO
// ===========================

export const auth = {
    /**
     * Registra um novo usuário
     */
    async register(email, password, name) {
        const result = await request('/auth/register', {
            method: 'POST',
            body: { email, password, name }
        });

        if (result.data?.token) {
            setAuthToken(result.data.token);
        }

        return result;
    },

    /**
     * Faz login do usuário
     */
    async login(email, password) {
        const result = await request('/auth/login', {
            method: 'POST',
            body: { email, password }
        });

        if (result.data?.token) {
            setAuthToken(result.data.token);
        }

        return result;
    },

    /**
     * Faz logout
     */
    async logout() {
        await request('/auth/logout', { method: 'POST' });
        setAuthToken(null);
    },

    /**
     * Obtém dados do usuário atual
     */
    async me() {
        return request('/auth/me');
    },

    /**
     * Verifica se está autenticado
     */
    isAuthenticated() {
        return !!authToken;
    }
};

// ===========================
// API DE PRODUTOS
// ===========================

export const products = {
    /**
     * Lista todos os produtos
     */
    async list(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return request(`/products${queryString ? `?${queryString}` : ''}`);
    },

    /**
     * Obtém detalhes de um produto
     */
    async get(id) {
        return request(`/products/${id}`);
    },

    /**
     * Busca produtos
     */
    async search(query) {
        return request(`/products/search?q=${encodeURIComponent(query)}`);
    },

    /**
     * Lista categorias
     */
    async categories() {
        return request('/products/categories');
    }
};

// ===========================
// API DO CARRINHO
// ===========================

export const cart = {
    /**
     * Obtém o carrinho do usuário
     */
    async get() {
        return request('/cart');
    },

    /**
     * Adiciona item ao carrinho
     */
    async addItem(productId, quantity = 1, size = null, color = null) {
        return request('/cart/items', {
            method: 'POST',
            body: { productId, quantity, size, color }
        });
    },

    /**
     * Atualiza quantidade de um item
     */
    async updateItem(itemId, quantity) {
        return request(`/cart/items/${itemId}`, {
            method: 'PUT',
            body: { quantity }
        });
    },

    /**
     * Remove item do carrinho
     */
    async removeItem(itemId) {
        return request(`/cart/items/${itemId}`, { method: 'DELETE' });
    },

    /**
     * Limpa o carrinho
     */
    async clear() {
        return request('/cart', { method: 'DELETE' });
    },

    /**
     * Finaliza a compra
     */
    async checkout(shippingAddress, paymentMethod) {
        return request('/cart/checkout', {
            method: 'POST',
            body: { shippingAddress, paymentMethod }
        });
    }
};

// ===========================
// API DE ADMIN
// ===========================

export const admin = {
    /**
     * Dashboard com métricas
     */
    async dashboard() {
        return request('/admin/dashboard');
    },

    // Produtos
    products: {
        async list(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return request(`/admin/products${queryString ? `?${queryString}` : ''}`);
        },

        async create(product) {
            return request('/admin/products', {
                method: 'POST',
                body: product
            });
        },

        async update(id, updates) {
            return request(`/admin/products/${id}`, {
                method: 'PUT',
                body: updates
            });
        },

        async delete(id) {
            return request(`/admin/products/${id}`, { method: 'DELETE' });
        }
    },

    // Pedidos
    orders: {
        async list(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return request(`/admin/orders${queryString ? `?${queryString}` : ''}`);
        },

        async updateStatus(id, status) {
            return request(`/admin/orders/${id}/status`, {
                method: 'PUT',
                body: { status }
            });
        }
    },

    // Usuários
    users: {
        async list(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return request(`/admin/users${queryString ? `?${queryString}` : ''}`);
        }
    }
};

// ===========================
// API DE UPLOAD
// ===========================

export const upload = {
    /**
     * Upload de imagem
     */
    async image(file) {
        const formData = new FormData();
        formData.append('image', file);
        return request('/upload', {
            method: 'POST',
            body: formData
        });
    }
};

// Export default com todos os módulos
export default {
    auth,
    products,
    cart,
    admin,
    upload,
    setAuthToken,
    getAuthToken
};
