/**
 * 👑 Dashboard Administrativo - Gerenciamento de Pedidos
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingCart, Search, Eye, ChevronLeft, ChevronRight,
    Package, Truck, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { admin } from '../../services/api';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        loadOrders();
    }, [pagination.page, statusFilter]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const params = { page: pagination.page, limit: 10 };
            if (statusFilter) params.status = statusFilter;

            const response = await admin.orders.list(params);
            setOrders(response.data?.orders || []);
            setPagination(prev => ({
                ...prev,
                totalPages: response.data?.pagination?.totalPages || 1,
                total: response.data?.pagination?.total || 0
            }));
        } catch (err) {
            console.error('Erro ao carregar pedidos:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            await admin.orders.updateStatus(orderId, newStatus);
            loadOrders();
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error('Erro ao atualizar status:', err);
            alert(err.message || 'Erro ao atualizar status');
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'paid': return <CheckCircle size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'delivered': return <Package size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const statusLabels = {
        pending: 'Pendente',
        paid: 'Pago',
        shipped: 'Enviado',
        delivered: 'Entregue',
        cancelled: 'Cancelado'
    };

    return (
        <div className="admin-orders">
            <header className="page-header">
                <div className="header-left">
                    <ShoppingCart size={24} />
                    <div>
                        <h1>Pedidos</h1>
                        <p>{pagination.total} pedidos no total</p>
                    </div>
                </div>
            </header>

            <div className="filters-bar">
                <div className="status-filters">
                    <button
                        className={`filter-btn ${statusFilter === '' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('')}
                    >
                        Todos
                    </button>
                    {Object.entries(statusLabels).map(([key, label]) => (
                        <button
                            key={key}
                            className={`filter-btn ${statusFilter === key ? 'active' : ''}`}
                            onClick={() => setStatusFilter(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="orders-grid">
                <div className="orders-list-container">
                    {loading ? (
                        <div className="loading">Carregando...</div>
                    ) : orders.length === 0 ? (
                        <div className="empty-state">
                            <ShoppingCart size={48} />
                            <p>Nenhum pedido encontrado</p>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <motion.div
                                    key={order.id}
                                    className={`order-card ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedOrder(order)}
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="order-header">
                                        <span className="order-id">#{order.id}</span>
                                        <span className={`status-badge ${order.status}`}>
                                            {getStatusIcon(order.status)}
                                            {statusLabels[order.status]}
                                        </span>
                                    </div>
                                    <div className="order-customer">
                                        <strong>{order.customerName}</strong>
                                        <span>{order.customerEmail}</span>
                                    </div>
                                    <div className="order-footer">
                                        <span className="order-total">{formatCurrency(order.total)}</span>
                                        <span className="order-date">{formatDate(order.created_at)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

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
                </div>

                {/* Order Details */}
                <div className="order-details">
                    {selectedOrder ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="detail-header">
                                <h2>Pedido #{selectedOrder.id}</h2>
                                <span className={`status-badge large ${selectedOrder.status}`}>
                                    {getStatusIcon(selectedOrder.status)}
                                    {statusLabels[selectedOrder.status]}
                                </span>
                            </div>

                            <div className="detail-section">
                                <h3>Cliente</h3>
                                <p><strong>{selectedOrder.customerName}</strong></p>
                                <p>{selectedOrder.customerEmail}</p>
                            </div>

                            {selectedOrder.shippingAddress && (
                                <div className="detail-section">
                                    <h3>Endereço de Entrega</h3>
                                    <p>
                                        {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.number}
                                        {selectedOrder.shippingAddress.complement && ` - ${selectedOrder.shippingAddress.complement}`}
                                    </p>
                                    <p>
                                        {selectedOrder.shippingAddress.neighborhood}, {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.state}
                                    </p>
                                    <p>CEP: {selectedOrder.shippingAddress.zipCode}</p>
                                </div>
                            )}

                            <div className="detail-section">
                                <h3>Itens do Pedido</h3>
                                <div className="order-items">
                                    {selectedOrder.items?.map(item => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-image">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.productName} />
                                                ) : (
                                                    <Package size={20} />
                                                )}
                                            </div>
                                            <div className="item-info">
                                                <span className="item-name">{item.productName}</span>
                                                <span className="item-qty">Qtd: {item.quantity}</span>
                                            </div>
                                            <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-section">
                                <div className="order-total-row">
                                    <span>Total</span>
                                    <strong>{formatCurrency(selectedOrder.total)}</strong>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Atualizar Status</h3>
                                <div className="status-actions">
                                    {Object.entries(statusLabels).map(([key, label]) => (
                                        <button
                                            key={key}
                                            className={`status-btn ${selectedOrder.status === key ? 'active' : ''}`}
                                            onClick={() => updateStatus(selectedOrder.id, key)}
                                            disabled={selectedOrder.status === key}
                                        >
                                            {getStatusIcon(key)}
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="no-selection">
                            <Eye size={48} />
                            <p>Selecione um pedido para ver os detalhes</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .admin-orders {
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

                .filters-bar {
                    margin-bottom: 1.5rem;
                }

                .status-filters {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #a1a1a1;
                    font-size: 0.875rem;
                    font-weight: 500;
                    border-radius: 0.5rem;
                    transition: all 0.25s ease;
                }

                .filter-btn:hover {
                    background: rgba(255,255,255,0.08);
                    color: white;
                }

                .filter-btn.active {
                    background: rgba(255,107,0,0.15);
                    border-color: #FF6B00;
                    color: #FF6B00;
                }

                .orders-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    min-height: 600px;
                }

                .orders-list-container {
                    display: flex;
                    flex-direction: column;
                }

                .orders-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    flex: 1;
                }

                .order-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 0.75rem;
                    padding: 1rem 1.25rem;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .order-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.1);
                }

                .order-card.selected {
                    border-color: #FF6B00;
                    background: rgba(255,107,0,0.05);
                }

                .order-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                }

                .order-id {
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 9999px;
                }

                .status-badge.large {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                }

                .status-badge.pending { background: rgba(234,179,8,0.15); color: #eab308; }
                .status-badge.paid { background: rgba(34,197,94,0.15); color: #22c55e; }
                .status-badge.shipped { background: rgba(59,130,246,0.15); color: #3b82f6; }
                .status-badge.delivered { background: rgba(168,85,247,0.15); color: #a855f7; }
                .status-badge.cancelled { background: rgba(239,68,68,0.15); color: #ef4444; }

                .order-customer {
                    margin-bottom: 0.75rem;
                }

                .order-customer strong {
                    display: block;
                    font-size: 0.9375rem;
                }

                .order-customer span {
                    font-size: 0.8125rem;
                    color: #6b7280;
                }

                .order-footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .order-total {
                    font-weight: 700;
                    color: #22c55e;
                }

                .order-date {
                    font-size: 0.75rem;
                    color: #6b7280;
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

                /* Order Details */
                .order-details {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }

                .detail-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .detail-header h2 {
                    font-size: 1.25rem;
                }

                .detail-section {
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .detail-section:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .detail-section h3 {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                }

                .detail-section p {
                    font-size: 0.9375rem;
                    color: #a1a1a1;
                    line-height: 1.5;
                }

                .order-items {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .order-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .item-image {
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

                .item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .item-info {
                    flex: 1;
                }

                .item-name {
                    display: block;
                    font-weight: 500;
                }

                .item-qty {
                    font-size: 0.75rem;
                    color: #6b7280;
                }

                .item-price {
                    font-weight: 600;
                }

                .order-total-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 1.125rem;
                }

                .order-total-row strong {
                    color: #22c55e;
                    font-size: 1.25rem;
                }

                .status-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .status-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.375rem;
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #a1a1a1;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    border-radius: 0.5rem;
                    transition: all 0.25s ease;
                }

                .status-btn:hover:not(:disabled) {
                    background: rgba(255,255,255,0.08);
                    color: white;
                }

                .status-btn.active {
                    background: rgba(255,107,0,0.15);
                    border-color: #FF6B00;
                    color: #FF6B00;
                }

                .status-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .no-selection, .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    min-height: 400px;
                    color: #6b7280;
                    text-align: center;
                }

                .no-selection svg, .empty-state svg {
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }

                .loading {
                    text-align: center;
                    padding: 4rem;
                    color: #6b7280;
                }

                @media (max-width: 1024px) {
                    .orders-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminOrders;
