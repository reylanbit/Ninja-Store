/**
 * 🎉 Página de Sucesso do Pedido
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
        page: {
            minHeight: '100vh',
            background: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            color: 'white',
            paddingTop: '6rem'
        },
        icon: {
            width: '6rem',
            height: '6rem',
            background: '#22c55e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
        },
        title: {
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-display, sans-serif)'
        },
        text: {
            color: '#a1a1a1',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            marginBottom: '3rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        orderInfo: {
            background: '#111',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            maxWidth: '400px',
            margin: '0 auto 2.5rem'
        },
        orderLabel: {
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#6b7280',
            fontWeight: 700,
            marginBottom: '0.5rem'
        },
        orderId: {
            fontSize: '1.5rem',
            fontFamily: 'monospace',
            color: 'var(--naruto-orange)',
            fontWeight: 800
        },
        btn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: 'var(--naruto-orange)',
            color: 'white',
            fontWeight: 800,
            borderRadius: '1rem',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'transform 0.2s',
            boxShadow: '0 10px 30px -10px rgba(255, 107, 0, 0.5)'
        },
        link: {
            display: 'block',
            marginTop: '1.5rem',
            color: '#6b7280',
            fontWeight: 700,
            fontSize: '0.875rem',
            textDecoration: 'none'
        }
    };

    return (
        <div style={styles.page}>
            <div className="premium-container">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={styles.icon}
                >
                    <Check size={48} color="white" strokeWidth={3} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={styles.title}
                >
                    Pedido Confirmado!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={styles.text}
                >
                    Arigatou! Seu equipamento ninja já está sendo preparado pela nossa equipe e chegará em breve na Vila da Folha.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={styles.orderInfo}
                >
                    <p style={styles.orderLabel}>ID DO PEDIDO</p>
                    <p style={styles.orderId}>#ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/products" style={styles.btn}>
                        Continuar Comprando <ShoppingBag size={20} />
                    </Link>
                    <Link to="/" style={styles.link}>
                        Voltar ao Início
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
