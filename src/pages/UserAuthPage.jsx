/**
 * 🔐 Página de Autenticação (Login / Registro)
 */

import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../services/api'; // usando api services direto
import { Mail, Lock, User, ArrowRight, Loader, AlertCircle } from 'lucide-react';

const UserAuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true); // Toggle entre Login e Register
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Limpa erro ao digitar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (isLogin) {
                response = await auth.login(formData.email, formData.password);
            } else {
                response = await auth.register(formData.email, formData.password, formData.name);
            }

            if (response.success || response.token) { // Verifica sucesso
                // Token já é salvo pelo api.js (setAuthToken)

                // Redireciona
                const origin = location.state?.from?.pathname || '/';
                navigate(origin);
                window.location.reload(); // Força recarregamento para atualizar estado global de auth (navbar etc) se necessario
            } else {
                throw new Error(response.error || 'Falha na autenticação');
            }

        } catch (err) {
            console.error('Auth erro:', err);
            setError(err.message || 'Erro ao conectar com o servidor');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        page: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            paddingTop: '6rem',
            background: 'url("https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=2574&auto=format&fit=crop") no-repeat center center/cover',
        },
        overlay: {
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 0
        },
        container: {
            position: 'relative',
            width: '100%',
            maxWidth: '450px',
            background: 'rgba(20, 20, 20, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            backdropFilter: 'blur(20px)',
            zIndex: 1,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2.5rem'
        },
        title: {
            fontSize: '2rem',
            fontWeight: 800,
            color: 'white',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#a1a1a1',
            fontSize: '0.9375rem'
        },
        formGroup: {
            marginBottom: '1.25rem',
            position: 'relative'
        },
        inputIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#a1a1a1'
        },
        input: {
            width: '100%',
            padding: '1rem 1rem 1rem 3rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0.75rem',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.2s'
        },
        btn: {
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #FF6B00 0%, #FF8F00 100%)',
            color: 'white',
            fontWeight: 800,
            borderRadius: '0.75rem',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            marginTop: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'transform 0.2s'
        },
        toggleText: {
            textAlign: 'center',
            color: '#a1a1a1',
            fontSize: '0.875rem'
        },
        toggleLink: {
            color: 'var(--naruto-orange)',
            fontWeight: 700,
            cursor: 'pointer',
            marginLeft: '0.5rem'
        },
        errorBox: {
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.overlay} />
            <motion.div
                style={styles.container}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={styles.header}>
                    <h1 style={styles.title}>{isLogin ? 'Bem-vindo de volta' : 'Junte-se à Aliança'}</h1>
                    <p style={styles.subtitle}>
                        {isLogin ? 'Acesse seu arsenal ninja' : 'Crie sua conta para começar sua jornada'}
                    </p>
                </div>

                {error && (
                    <motion.div style={styles.errorBox} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <AlertCircle size={18} /> {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                key="name-field"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={styles.formGroup}>
                                    <User size={18} style={styles.inputIcon} />
                                    <input
                                        style={styles.input}
                                        type="text"
                                        name="name"
                                        placeholder="Seu Nome Ninja"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={styles.formGroup}>
                        <Mail size={18} style={styles.inputIcon} />
                        <input
                            style={styles.input}
                            type="email"
                            name="email"
                            placeholder="Seu Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <Lock size={18} style={styles.inputIcon} />
                        <input
                            style={styles.input}
                            type="password"
                            name="password"
                            placeholder="Sua Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <motion.button
                        style={styles.btn}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                    >
                        {loading ? <Loader className="animate-spin" /> : (
                            <>
                                {isLogin ? 'Entrar' : 'Registrar'} <ArrowRight size={18} />
                            </>
                        )}
                    </motion.button>
                </form>

                <div style={styles.toggleText}>
                    {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                    <span
                        style={styles.toggleLink}
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin ? 'Criar Nova Conta' : 'Fazer Login'}
                    </span>
                </div>
            </motion.div>
            <style>{`
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default UserAuthPage;
