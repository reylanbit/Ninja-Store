/**
 * 🍥 Navbar Temática - Ninja Store
 */

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Zap, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { auth } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenCart }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        checkAuth();
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [location]);

    const checkAuth = async () => {
        if (auth.isAuthenticated()) {
            try {
                const response = await auth.me();
                setUser(response.data?.user);
            } catch (error) {
                auth.logout();
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    const handleLogout = () => {
        auth.logout();
        setUser(null);
        setShowUserMenu(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Arsenal', path: '/products' },
    ];

    const styles = {
        nav: {
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 100,
            padding: isScrolled ? '1rem 0' : '1.5rem 0',
            background: isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(20px)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            transition: 'all 0.3s ease'
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
        },
        logoIcon: {
            width: '2.5rem',
            height: '2.5rem',
            background: 'linear-gradient(135deg, var(--naruto-orange), #ff4500)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        },
        logoText: {
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1
        },
        logoTitle: {
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.25rem',
            color: 'white'
        },
        logoSubtitle: {
            fontSize: '0.75rem',
            color: 'var(--naruto-orange)',
            letterSpacing: '0.2em',
            fontWeight: 700
        },
        desktopNav: {
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
        },
        navLink: (active) => ({
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: active ? 'var(--naruto-orange)' : '#a1a1a1',
            transition: 'color 0.2s',
            cursor: 'pointer'
        }),
        actions: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        iconBtn: {
            background: 'none',
            border: 'none',
            color: '#a1a1a1',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center'
        },
        userAvatar: {
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #333, #111)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--naruto-orange)',
            fontWeight: 700,
            fontSize: '0.875rem'
        },
        cartBadge: {
            position: 'absolute',
            top: -2,
            right: -2,
            background: 'var(--naruto-orange)',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 900,
            width: '1.125rem',
            height: '1.125rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(255, 107, 0, 0.4)'
        },
        dropdown: {
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '1rem',
            width: '240px',
            background: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            zIndex: 110
        }
    };

    return (
        <nav style={styles.nav}>
            <div className="premium-container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <motion.div
                        style={styles.logoIcon}
                        whileHover={{ rotate: 15 }}
                    >
                        <Zap size={20} fill="currentColor" />
                    </motion.div>
                    <div style={styles.logoText}>
                        <span style={styles.logoTitle}>NINJA</span>
                        <span style={styles.logoSubtitle}>STORE</span>
                    </div>
                </Link>

                <div className="desktop-menu" style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
                    {/* Add media query handled via CSS class internally or simple condition if we had viewport width */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={styles.navLink(location.pathname === link.path)}
                                onMouseEnter={(e) => e.target.style.color = 'var(--naruto-orange)'}
                                onMouseLeave={(e) => e.target.style.color = location.pathname === link.path ? 'var(--naruto-orange)' : '#a1a1a1'}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Responsive helper: show desktop menu logic */}
                <style>{`
                    .desktop-menu { display: none; }
                    .mobile-toggle { display: block; }
                    @media (min-width: 768px) {
                        .desktop-menu { display: flex; }
                        .mobile-toggle { display: none; }
                    }
                `}</style>

                <div style={styles.actions}>
                    {/* User Menu */}
                    <div style={{ position: 'relative' }} ref={menuRef}>
                        {user ? (
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <div style={styles.userAvatar}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </button>
                        ) : (
                            <Link to="/login" style={styles.iconBtn}>
                                <User size={22} />
                            </Link>
                        )}

                        <AnimatePresence>
                            {showUserMenu && user && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    style={styles.dropdown}
                                >
                                    <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontWeight: 700, color: 'white' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{user.email}</div>
                                    </div>

                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin/dashboard"
                                            onClick={() => setShowUserMenu(false)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                padding: '0.75rem 1rem', color: '#a1a1a1',
                                                fontSize: '0.875rem', textDecoration: 'none',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'var(--naruto-orange)'; }}
                                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#a1a1a1'; }}
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                                            padding: '0.75rem 1rem', color: '#ef4444',
                                            fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer',
                                            textAlign: 'left'
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                    >
                                        <LogOut size={16} />
                                        Sair
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart */}
                    <button
                        onClick={onOpenCart}
                        style={{ ...styles.iconBtn, position: 'relative' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1a1'}
                    >
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={styles.cartBadge}
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={styles.iconBtn}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem' }}>
                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{
                                        fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase',
                                        color: location.pathname === link.path ? 'var(--naruto-orange)' : '#a1a1a1',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
