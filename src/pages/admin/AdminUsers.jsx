/**
 * 👑 Dashboard Administrativo - Gerenciamento de Usuários
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, ChevronLeft, ChevronRight, ShoppingBag, Calendar } from 'lucide-react';
import { admin } from '../../services/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, [pagination.page]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await admin.users.list({ page: pagination.page, limit: 15 });
            setUsers(response.data?.users || []);
            setPagination(prev => ({
                ...prev,
                totalPages: response.data?.pagination?.totalPages || 1,
                total: response.data?.pagination?.total || 0
            }));
        } catch (err) {
            console.error('Erro ao carregar usuários:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-users">
            <header className="page-header">
                <div className="header-left">
                    <Users size={24} />
                    <div>
                        <h1>Usuários</h1>
                        <p>{pagination.total} usuários cadastrados</p>
                    </div>
                </div>
            </header>

            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="users-table-container">
                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : filteredUsers.length === 0 ? (
                    <div className="empty-state">
                        <Users size={48} />
                        <p>Nenhum usuário encontrado</p>
                    </div>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Função</th>
                                <th>Pedidos</th>
                                <th>Cadastro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="user-info">
                                                <span className="user-name">{user.name}</span>
                                                <span className="user-email">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="orders-count">
                                            <ShoppingBag size={16} />
                                            {user.ordersCount || 0} pedidos
                                        </div>
                                    </td>
                                    <td>
                                        <div className="date-cell">
                                            <Calendar size={14} />
                                            {formatDate(user.created_at)}
                                        </div>
                                    </td>
                                </motion.tr>
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

            <style>{`
                .admin-users {
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

                .users-table-container {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 1rem;
                    overflow: hidden;
                }

                .users-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .users-table th {
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

                .users-table td {
                    padding: 1rem 1.25rem;
                    border-bottom: 1px solid rgba(255,255,255,0.03);
                }

                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .user-avatar {
                    width: 42px;
                    height: 42px;
                    background: linear-gradient(135deg, #FF6B00, #CC5500);
                    border-radius: 0.75rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1rem;
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                }

                .user-name {
                    font-weight: 600;
                }

                .user-email {
                    font-size: 0.8125rem;
                    color: #6b7280;
                }

                .role-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border-radius: 9999px;
                }

                .role-badge.admin {
                    background: rgba(168,85,247,0.15);
                    color: #a855f7;
                }

                .role-badge.customer {
                    background: rgba(59,130,246,0.15);
                    color: #3b82f6;
                }

                .orders-count {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #a1a1a1;
                    font-size: 0.9375rem;
                }

                .orders-count svg {
                    color: #FF6B00;
                }

                .date-cell {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #6b7280;
                    font-size: 0.875rem;
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

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem;
                    color: #6b7280;
                }

                .empty-state svg {
                    margin-bottom: 1rem;
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
};

export default AdminUsers;
