/**
 * 👑 Dashboard Administrativo - Login
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { auth } from '../../services/api';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await auth.login(formData.email, formData.password);

            if (response.data?.user?.role !== 'admin') {
                setError('Acesso restrito a administradores');
                auth.logout();
                return;
            }

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <motion.div
                className="admin-login-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="admin-login-header">
                    <div className="admin-logo">
                        <span className="logo-icon">🍥</span>
                        <span className="logo-text">Ninja Store</span>
                    </div>
                    <h1>Painel Administrativo</h1>
                    <p>Faça login para acessar o dashboard</p>
                </div>

                {error && (
                    <motion.div
                        className="admin-error"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        <AlertCircle size={18} />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@ninjastore.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="admin-login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <p>Credenciais padrão:</p>
                    <code>admin@ninjastore.com / admin123</code>
                </div>
            </motion.div>

            <style>{`
                .admin-login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                }

                .admin-login-card {
                    width: 100%;
                    max-width: 420px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                }

                .admin-login-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .admin-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .logo-icon {
                    font-size: 2.5rem;
                }

                .logo-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #FF6B00, #FF8C38);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .admin-login-header h1 {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .admin-login-header p {
                    color: #6b7280;
                    font-size: 0.9375rem;
                }

                .admin-error {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    background: rgba(220, 38, 38, 0.1);
                    border: 1px solid rgba(220, 38, 38, 0.3);
                    border-radius: 0.75rem;
                    color: #ef4444;
                    font-size: 0.9375rem;
                    margin-bottom: 1.5rem;
                }

                .admin-login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    color: #a1a1a1;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 1rem;
                    color: #6b7280;
                    pointer-events: none;
                }

                .input-wrapper input {
                    width: 100%;
                    padding: 0.875rem 1rem 0.875rem 3rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.25s ease;
                }

                .input-wrapper input:focus {
                    outline: none;
                    border-color: #FF6B00;
                    background: rgba(255, 255, 255, 0.08);
                }

                .input-wrapper input::placeholder {
                    color: #4a4a4a;
                }

                .password-toggle {
                    position: absolute;
                    right: 1rem;
                    color: #6b7280;
                    padding: 0.25rem;
                    transition: color 0.25s ease;
                }

                .password-toggle:hover {
                    color: white;
                }

                .admin-login-btn {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #FF6B00, #CC5500);
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    border-radius: 0.75rem;
                    transition: all 0.25s ease;
                    margin-top: 0.5rem;
                }

                .admin-login-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
                }

                .admin-login-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .admin-login-footer {
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    text-align: center;
                }

                .admin-login-footer p {
                    font-size: 0.8125rem;
                    color: #6b7280;
                    margin-bottom: 0.5rem;
                }

                .admin-login-footer code {
                    font-size: 0.8125rem;
                    color: #FF6B00;
                    background: rgba(255, 107, 0, 0.1);
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
