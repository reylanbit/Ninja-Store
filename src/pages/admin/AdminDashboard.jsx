/**
 * 👑 Dashboard Administrativo - Principal
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut,
    Menu,
    X,
    TrendingUp,
    DollarSign,
    ShoppingBag,
    UserCheck,
    ChevronRight,
    Bell,
    Settings
} from 'lucide-react';
import { admin, auth } from '../../services/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        loadDashboardData();
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const response = await auth.me();
            setUser(response.data?.user);
        } catch (err) {
            navigate('/admin');
        }
    };

    const loadDashboardData = async () => {
        try {
            const response = await admin.dashboard();
            setStats(response.data);
        } catch (err) {
            console.error('Erro ao carregar dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        auth.logout();
        navigate('/admin');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/products', icon: Package, label: 'Produtos' },
        { path: '/admin/orders', icon: ShoppingCart, label: 'Pedidos' },
        { path: '/admin/users', icon: Users, label: 'Usuários' },
    ];

    const isActive = (path) => location.pathname === path;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Se estiver em uma sub-rota, renderiza o Outlet
    if (location.pathname !== '/admin/dashboard') {
        return (
            <div className="admin-layout">
                <Sidebar
                    open={sidebarOpen}
                    setOpen={setSidebarOpen}
                    menuItems={menuItems}
                    isActive={isActive}
                    onLogout={handleLogout}
                    user={user}
                />
                <main className="admin-main">
                    <Outlet />
                </main>
                <AdminStyles />
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                menuItems={menuItems}
                isActive={isActive}
                onLogout={handleLogout}
                user={user}
            />

            <main className="admin-main">
                {/* Header */}
                <header className="admin-header">
                    <div className="header-left">
                        <button
                            className="sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1>Dashboard</h1>
                            <p>Bem-vindo de volta, {user?.name || 'Admin'}!</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <button className="header-btn">
                            <Bell size={20} />
                        </button>
                        <button className="header-btn">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="admin-content">
                    {loading ? (
                        <div className="loading-state">Carregando...</div>
                    ) : (
                        <>
                            <div className="stats-grid">
                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="stat-icon revenue">
                                        <DollarSign size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Receita Total</span>
                                        <span className="stat-value">
                                            {formatCurrency(stats?.overview?.totalRevenue || 0)}
                                        </span>
                                    </div>
                                    <TrendingUp size={16} className="stat-trend positive" />
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="stat-icon orders">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Total Pedidos</span>
                                        <span className="stat-value">
                                            {stats?.overview?.totalOrders || 0}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="stat-icon products">
                                        <Package size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Produtos</span>
                                        <span className="stat-value">
                                            {stats?.overview?.totalProducts || 0}
                                        </span>
                                    </div>
                                    <span className="stat-sub">
                                        {stats?.overview?.inStock || 0} em estoque
                                    </span>
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="stat-icon users">
                                        <UserCheck size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-label">Clientes</span>
                                        <span className="stat-value">
                                            {stats?.overview?.totalUsers || 0}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Recent Orders */}
                            <div className="dashboard-panels">
                                <motion.div
                                    className="panel"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="panel-header">
                                        <h2>Pedidos Recentes</h2>
                                        <Link to="/admin/orders" className="panel-link">
                                            Ver todos <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                    <div className="panel-content">
                                        {stats?.recentOrders?.length > 0 ? (
                                            <table className="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Cliente</th>
                                                        <th>Total</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stats.recentOrders.slice(0, 5).map(order => (
                                                        <tr key={order.id}>
                                                            <td>#{order.id}</td>
                                                            <td>{order.customerName}</td>
                                                            <td>{formatCurrency(order.total)}</td>
                                                            <td>
                                                                <span className={`status-badge ${order.status}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="empty-state">Nenhum pedido ainda</p>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Top Products */}
                                <motion.div
                                    className="panel"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="panel-header">
                                        <h2>Mais Vendidos</h2>
                                        <Link to="/admin/products" className="panel-link">
                                            Ver todos <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                    <div className="panel-content">
                                        {stats?.topProducts?.length > 0 ? (
                                            <div className="top-products">
                                                {stats.topProducts.map((product, index) => (
                                                    <div key={product.id} className="top-product-item">
                                                        <span className="rank">#{index + 1}</span>
                                                        <div className="product-info">
                                                            <span className="name">{product.name}</span>
                                                            <span className="sales">{product.totalSold} vendidos</span>
                                                        </div>
                                                        <span className="price">{formatCurrency(product.price)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="empty-state">Nenhuma venda ainda</p>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </main>

            <AdminStyles />
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ open, setOpen, menuItems, isActive, onLogout, user }) => (
    <aside className={`admin-sidebar ${open ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
            <Link to="/" className="sidebar-logo">
                <span className="logo-icon">🍥</span>
                {open && <span className="logo-text">Ninja Store</span>}
            </Link>
            <button className="close-btn" onClick={() => setOpen(false)}>
                <X size={20} />
            </button>
        </div>

        <nav className="sidebar-nav">
            {menuItems.map(item => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                    <item.icon size={20} />
                    {open && <span>{item.label}</span>}
                </Link>
            ))}
        </nav>

        <div className="sidebar-footer">
            {open && user && (
                <div className="user-info">
                    <div className="user-avatar">{user.name?.charAt(0)}</div>
                    <div className="user-details">
                        <span className="user-name">{user.name}</span>
                        <span className="user-role">{user.role}</span>
                    </div>
                </div>
            )}
            <button className="logout-btn" onClick={onLogout}>
                <LogOut size={20} />
                {open && <span>Sair</span>}
            </button>
        </div>
    </aside>
);

// Admin Styles
const AdminStyles = () => (
    <style>{`
        .admin-layout {
            display: flex;
            min-height: 100vh;
            background: #0a0a0a;
        }

        /* Sidebar */
        .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            background: #111;
            border-right: 1px solid rgba(255,255,255,0.05);
            display: flex;
            flex-direction: column;
            transition: width 0.3s ease;
            z-index: 100;
        }

        .admin-sidebar.open { width: 260px; }
        .admin-sidebar.closed { width: 72px; }

        .sidebar-header {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .sidebar-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo-icon { font-size: 1.75rem; }
        .logo-text {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1.25rem;
            background: linear-gradient(135deg, #FF6B00, #FF8C38);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .close-btn {
            color: #6b7280;
            padding: 0.25rem;
        }

        .sidebar-nav {
            flex: 1;
            padding: 1rem 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.875rem 1rem;
            color: #a1a1a1;
            border-radius: 0.75rem;
            transition: all 0.2s ease;
        }

        .nav-item:hover {
            color: white;
            background: rgba(255,255,255,0.05);
        }

        .nav-item.active {
            color: white;
            background: linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,107,0,0.1));
            border: 1px solid rgba(255,107,0,0.3);
        }

        .sidebar-footer {
            padding: 1rem;
            border-top: 1px solid rgba(255,255,255,0.05);
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            margin-bottom: 0.5rem;
        }

        .user-avatar {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #FF6B00, #CC5500);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
        }

        .user-details {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-weight: 600;
            font-size: 0.875rem;
        }

        .user-role {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: capitalize;
        }

        .logout-btn {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.875rem 1rem;
            color: #ef4444;
            border-radius: 0.75rem;
            width: 100%;
            transition: all 0.2s ease;
        }

        .logout-btn:hover {
            background: rgba(239,68,68,0.1);
        }

        /* Main Content */
        .admin-main {
            flex: 1;
            margin-left: 260px;
            transition: margin-left 0.3s ease;
        }

        .admin-sidebar.closed ~ .admin-main {
            margin-left: 72px;
        }

        .admin-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 2rem;
            background: #111;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            position: sticky;
            top: 0;
            z-index: 50;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .sidebar-toggle {
            padding: 0.5rem;
            color: #6b7280;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
        }

        .sidebar-toggle:hover {
            color: white;
            background: rgba(255,255,255,0.05);
        }

        .header-left h1 {
            font-size: 1.5rem;
            margin-bottom: 0.25rem;
        }

        .header-left p {
            font-size: 0.875rem;
            color: #6b7280;
        }

        .header-right {
            display: flex;
            gap: 0.5rem;
        }

        .header-btn {
            padding: 0.75rem;
            color: #6b7280;
            border-radius: 0.75rem;
            transition: all 0.2s ease;
        }

        .header-btn:hover {
            color: white;
            background: rgba(255,255,255,0.05);
        }

        .admin-content {
            padding: 2rem;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 1rem;
            padding: 1.5rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            position: relative;
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .stat-icon.revenue { background: rgba(34,197,94,0.2); color: #22c55e; }
        .stat-icon.orders { background: rgba(59,130,246,0.2); color: #3b82f6; }
        .stat-icon.products { background: rgba(168,85,247,0.2); color: #a855f7; }
        .stat-icon.users { background: rgba(255,107,0,0.2); color: #FF6B00; }

        .stat-info {
            display: flex;
            flex-direction: column;
        }

        .stat-label {
            font-size: 0.875rem;
            color: #6b7280;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 800;
            margin-top: 0.25rem;
        }

        .stat-trend {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
        }

        .stat-trend.positive { color: #22c55e; }
        .stat-trend.negative { color: #ef4444; }

        .stat-sub {
            font-size: 0.75rem;
            color: #6b7280;
            position: absolute;
            bottom: 1rem;
            right: 1.5rem;
        }

        /* Panels */
        .dashboard-panels {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 1.5rem;
        }

        .panel {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 1rem;
            overflow: hidden;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .panel-header h2 {
            font-size: 1rem;
        }

        .panel-link {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
            color: #FF6B00;
        }

        .panel-content {
            padding: 1rem;
        }

        /* Table */
        .admin-table {
            width: 100%;
            border-collapse: collapse;
        }

        .admin-table th,
        .admin-table td {
            padding: 0.875rem 1rem;
            text-align: left;
        }

        .admin-table th {
            font-size: 0.75rem;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .admin-table td {
            font-size: 0.9375rem;
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .admin-table tr:last-child td {
            border-bottom: none;
        }

        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
        }

        .status-badge.pending { background: rgba(234,179,8,0.2); color: #eab308; }
        .status-badge.paid { background: rgba(34,197,94,0.2); color: #22c55e; }
        .status-badge.shipped { background: rgba(59,130,246,0.2); color: #3b82f6; }
        .status-badge.delivered { background: rgba(168,85,247,0.2); color: #a855f7; }
        .status-badge.cancelled { background: rgba(239,68,68,0.2); color: #ef4444; }

        /* Top Products */
        .top-products {
            display: flex;
            flex-direction: column;
        }

        .top-product-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.875rem 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .top-product-item:last-child {
            border-bottom: none;
        }

        .rank {
            width: 28px;
            height: 28px;
            background: rgba(255,107,0,0.2);
            color: #FF6B00;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
        }

        .product-info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .product-info .name {
            font-weight: 500;
            font-size: 0.9375rem;
        }

        .product-info .sales {
            font-size: 0.75rem;
            color: #6b7280;
        }

        .price {
            font-weight: 600;
            color: #22c55e;
        }

        .empty-state {
            text-align: center;
            color: #6b7280;
            padding: 2rem;
        }

        .loading-state {
            text-align: center;
            color: #6b7280;
            padding: 4rem;
        }

        @media (max-width: 1200px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .dashboard-panels {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .admin-sidebar.open {
                position: fixed;
                z-index: 200;
            }
            .admin-main {
                margin-left: 0;
            }
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
    `}</style>
);

export default AdminDashboard;
