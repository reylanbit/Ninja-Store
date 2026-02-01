/**
 * 👑 Dashboard Administrativo - Gerenciamento de Produtos
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit, Trash2, X, Save,
    Package, ChevronLeft, ChevronRight, Image, Upload, Loader
} from 'lucide-react';
import { admin, upload } from '../../services/api';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        inStock: true
    });

    useEffect(() => {
        loadProducts();
    }, [pagination.page]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await admin.products.list({ page: pagination.page, limit: 10 });
            setProducts(response.data?.products || []);
            setPagination(prev => ({
                ...prev,
                totalPages: response.data?.pagination?.totalPages || 1,
                total: response.data?.pagination?.total || 0
            }));
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                description: product.description || '',
                category: product.category,
                image: product.image || '',
                inStock: product.inStock
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                price: '',
                description: '',
                category: '',
                image: '',
                inStock: true
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const response = await upload.image(file);
            setFormData(prev => ({
                ...prev,
                image: response.imageUrl
            }));
        } catch (err) {
            console.error('Erro no upload:', err);
            alert('Falha ao fazer upload da imagem: ' + (err.message || 'Erro desconhecido'));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingProduct) {
                await admin.products.update(editingProduct.id, productData);
            } else {
                await admin.products.create(productData);
            }

            closeModal();
            loadProducts();
        } catch (err) {
            console.error('Erro ao salvar produto:', err);
            alert(err.message || 'Erro ao salvar produto');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

        try {
            await admin.products.delete(id);
            loadProducts();
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            alert(err.message || 'Erro ao excluir produto');
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-products">
            <header className="page-header">
                <div className="header-left">
                    <Package size={24} />
                    <div>
                        <h1>Produtos</h1>
                        <p>{pagination.total} produtos cadastrados</p>
                    </div>
                </div>
                <button className="btn-primary" onClick={() => openModal()}>
                    <Plus size={18} />
                    Novo Produto
                </button>
            </header>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="products-table-container">
                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="product-cell">
                                            <div className="product-image">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} />
                                                ) : (
                                                    <Image size={20} />
                                                )}
                                            </div>
                                            <div className="product-info">
                                                <span className="product-name">{product.name}</span>
                                                <span className="product-id">ID: {product.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="category-badge">{product.category}</span>
                                    </td>
                                    <td className="price-cell">{formatCurrency(product.price)}</td>
                                    <td>
                                        <span className={`status-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                            {product.inStock ? 'Em estoque' : 'Esgotado'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button
                                                className="action-btn edit"
                                                onClick={() => openModal(product)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    disabled={pagination.page <= 1}
                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                >
                    <ChevronLeft size={18} />
                </button>
                <span>Página {pagination.page} de {pagination.totalPages}</span>
                <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                                <button className="close-btn" onClick={closeModal}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="modal-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nome do Produto *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="price">Preço (R$) *</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            step="0.01"
                                            min="0"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Categoria *</label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Camisetas">Camisetas</option>
                                            <option value="Moletons">Moletons</option>
                                            <option value="Acessórios">Acessórios</option>
                                            <option value="Colecionáveis">Colecionáveis</option>
                                            <option value="Decoração">Decoração</option>
                                            <option value="Edição Especial">Edição Especial</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Imagem do Produto</label>

                                    {formData.image && (
                                        <div style={{ marginBottom: '1rem', borderRadius: '0.5rem', overflow: 'hidden', height: '150px', background: '#222', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <input
                                            type="text"
                                            id="image"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="URL da imagem ou faça upload ->"
                                            style={{ flex: 1 }}
                                        />
                                        <label style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            padding: '0 1rem', background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '0.5rem', cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                            onMouseEnter={(e) => !uploading && (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                                            onMouseLeave={(e) => !uploading && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                                disabled={uploading}
                                            />
                                            {uploading ? (
                                                <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                            ) : (
                                                <Upload size={18} />
                                            )}
                                        </label>
                                    </div>
                                    <style>{`
                                        @keyframes spin { to { transform: rotate(360deg); } }
                                    `}</style>
                                </div>

                                <div className="form-group checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="inStock"
                                            checked={formData.inStock}
                                            onChange={handleChange}
                                        />
                                        <span>Produto em estoque</span>
                                    </label>
                                </div>

                                <div className="modal-actions">
                                    <button type="button" className="btn-secondary" onClick={closeModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-primary">
                                        <Save size={18} />
                                        {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .admin-products {
                    padding: 2rem;
                }

                .page-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .header-left svg {
                    color: #FF6B00;
                }

                .header-left h1 {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .header-left p {
                    font-size: 0.875rem;
                    color: #6b7280;
                }

                .btn-primary {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(135deg, #FF6B00, #CC5500);
                    color: white;
                    font-weight: 600;
                    border-radius: 0.75rem;
                    transition: all 0.25s ease;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255,107,0,0.3);
                }

                .btn-secondary {
                    padding: 0.75rem 1.5rem;
                    background: rgba(255,255,255,0.05);
                    color: white;
                    font-weight: 500;
                    border-radius: 0.75rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.25s ease;
                }

                .btn-secondary:hover {
                    background: rgba(255,255,255,0.1);
                }

                .filters-bar {
                    margin-bottom: 1.5rem;
                }

                .search-box {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 0.75rem;
                    max-width: 400px;
                }

                .search-box svg {
                    color: #6b7280;
                }

                .search-box input {
                    flex: 1;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 0.9375rem;
                }

                .search-box input:focus {
                    outline: none;
                }

                .products-table-container {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 1rem;
                    overflow: hidden;
                }

                .products-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .products-table th {
                    padding: 1rem 1.25rem;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    background: rgba(255,255,255,0.02);
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .products-table td {
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }

                .product-cell {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .product-image {
                    width: 48px;
                    height: 48px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    color: #6b7280;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .product-info {
                    display: flex;
                    flex-direction: column;
                }

                .product-name {
                    font-weight: 500;
                }

                .product-id {
                    font-size: 0.75rem;
                    color: #6b7280;
                }

                .category-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background: rgba(168,85,247,0.15);
                    color: #a855f7;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 9999px;
                }

                .price-cell {
                    font-weight: 600;
                    color: #22c55e;
                }

                .status-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 9999px;
                }

                .status-badge.in-stock {
                    background: rgba(34,197,94,0.15);
                    color: #22c55e;
                }

                .status-badge.out-of-stock {
                    background: rgba(239,68,68,0.15);
                    color: #ef4444;
                }

                .actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .action-btn {
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    transition: all 0.25s ease;
                }

                .action-btn.edit {
                    color: #3b82f6;
                    background: rgba(59,130,246,0.1);
                }

                .action-btn.edit:hover {
                    background: rgba(59,130,246,0.2);
                }

                .action-btn.delete {
                    color: #ef4444;
                    background: rgba(239,68,68,0.1);
                }

                .action-btn.delete:hover {
                    background: rgba(239,68,68,0.2);
                }

                .pagination {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .pagination button {
                    padding: 0.5rem;
                    color: #6b7280;
                    border-radius: 0.5rem;
                    transition: all 0.25s ease;
                }

                .pagination button:hover:not(:disabled) {
                    color: white;
                    background: rgba(255,255,255,0.1);
                }

                .pagination button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .pagination span {
                    font-size: 0.875rem;
                    color: #6b7280;
                }

                .loading {
                    text-align: center;
                    padding: 4rem;
                    color: #6b7280;
                }

                /* Modal */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    z-index: 200;
                }

                .modal {
                    width: 100%;
                    max-width: 500px;
                    background: #111;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 1rem;
                    overflow: hidden;
                }

                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .modal-header h2 {
                    font-size: 1.25rem;
                }

                .close-btn {
                    color: #6b7280;
                    padding: 0.25rem;
                }

                .close-btn:hover {
                    color: white;
                }

                .modal-form {
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    color: #a1a1a1;
                    margin-bottom: 0.5rem;
                }

                .form-group input,
                .form-group select,
                .form-group textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 0.5rem;
                    color: white;
                    font-size: 0.9375rem;
                }

                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #FF6B00;
                }

                .form-group.checkbox label {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                }

                .form-group.checkbox input {
                    width: auto;
                    accent-color: #FF6B00;
                }

                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                    margin-top: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default AdminProducts;
