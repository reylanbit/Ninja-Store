import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../services/cartServices';

import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 150
                        }}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: '450px',
                            background: '#0a0a0a',
                            borderLeft: '1px solid rgba(255,255,255,0.05)',
                            zIndex: 200,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <ShoppingBag size={20} /> SEU ARSENAL
                            </h2>
                            <button
                                onClick={onClose}
                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#9ca3af', width: '2.5rem', height: '2.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                            {cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', opacity: 0.5 }}>
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p style={{ fontWeight: 500 }}>Seu inventário está vazio.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {cart.map((item) => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div style={{ width: '6rem', height: '6rem', background: '#111', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>{item.name}</h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p style={{ color: '#a855f7', fontWeight: 900, marginBottom: '1rem' }}>{formatCurrency(item.price)}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '0.25rem' }}>
                                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} style={{ width: '2rem', height: '2rem', border: 'none', background: 'none', color: '#fff', cursor: 'pointer' }}>-</button>
                                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, minWidth: '1rem', textAlign: 'center' }}>{item.quantity || 1}</span>
                                                        <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} style={{ width: '2rem', height: '2rem', border: 'none', background: 'none', color: '#fff', cursor: 'pointer' }}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <span style={{ color: '#9ca3af', fontWeight: 600 }}>Total do Pedido</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>{formatCurrency(cartTotal)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    style={{
                                        width: '100%',
                                        padding: '1.5rem',
                                        background: '#fff',
                                        color: '#000',
                                        fontWeight: 900,
                                        borderRadius: '1rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75rem'
                                    }}
                                >
                                    FINALIZAR MISSÃO <ArrowRight size={20} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
