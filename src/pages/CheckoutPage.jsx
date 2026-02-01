/**
 * 💳 Página de Checkout
 */

import { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { cart as cartApi, auth } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, Truck, ShieldCheck, ArrowRight, Loader } from 'lucide-react';
import { formatCurrency } from '../services/cartServices';

const CheckoutPage = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const authChecked = useRef(false);

    useEffect(() => {
        if (!auth.isAuthenticated() && !authChecked.current) {
            authChecked.current = true;
            alert('Você precisa estar logado para finalizar a compra.');
            navigate('/login', { state: { from: { pathname: '/checkout' } } });
        }
    }, [navigate]);

    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: ''
    });

    const [payment, setPayment] = useState({
        holderName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // Simulação de busca de CEP
    const handleCepBlur = async () => {
        if (address.cep.length === 8) {
            // Simulando um delay e preenchimento
            // Numa app real usaria viaCep
            setAddress(prev => ({
                ...prev,
                street: 'Rua dos Shinobis',
                neighborhood: 'Vila da Folha',
                city: 'Konoha',
                state: 'PF' // País do Fogo rs
            }));
        }
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'cardNumber') {
            value = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        if (e.target.name === 'expiry') {
            value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
        }
        setPayment({ ...payment, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simular processamento
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Validação e Adaptação para o Schema do Backend
            const shippingAddress = {
                street: address.street,
                number: address.number,
                complement: address.complement,
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state.toUpperCase().slice(0, 2), // Garante 2 caracteres
                zipCode: address.cep
            };

            // O backend espera apenas a string do método (dados do cartão são apenas simulados no frontend)
            const paymentMethodStr = 'credit_card';

            // Chamar API real para criar pedido
            await cartApi.checkout(shippingAddress, paymentMethodStr);

            clearCart();
            navigate('/order-success');
        } catch (error) {
            console.error('Erro no checkout:', error);
            if (error.status === 401) {
                alert('Sessão expirada ou acesso negado. Por favor faça login.');
                navigate('/login', { state: { from: { pathname: '/checkout' } } });
            } else {
                alert('Erro ao processar pedido: ' + (error.message || 'Tente novamente.'));
            }
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
                <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
                <button onClick={() => navigate('/products')} className="text-orange-500 hover:underline">
                    Voltar ao Arsenal
                </button>
            </div>
        );
    }

    // Estilos inline para simplicidade (ou classes globais se preferir)
    // Vou usar classes globais onde possível e styles object
    const styles = {
        page: {
            paddingTop: '8rem',
            paddingBottom: '4rem',
            minHeight: '100vh',
            background: '#050505',
            color: 'white'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '4rem'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 800,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            color: '#a1a1a1',
            marginBottom: '0.5rem',
            fontWeight: 600
        },
        input: {
            width: '100%',
            padding: '1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0.75rem',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
        },
        row: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        },
        summaryCard: {
            background: '#111',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255,255,255,0.1)',
            position: 'sticky',
            top: '8rem'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            color: '#a1a1a1',
            fontSize: '0.9375rem'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'white'
        },
        btnPrimary: {
            width: '100%',
            padding: '1.25rem',
            background: 'var(--naruto-orange)',
            color: 'white',
            fontWeight: 800,
            fontSize: '1rem',
            borderRadius: '1rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Left Column: Forms */}
                <div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        <Step active={step >= 1} number={1} title="Endereço" />
                        <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', alignSelf: 'center' }} />
                        <Step active={step >= 2} number={2} title="Pagamento" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 style={styles.sectionTitle}><MapPin className="text-orange-500" /> Endereço de Entrega</h2>

                                    <div style={styles.row}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>CEP</label>
                                            <input
                                                style={styles.input}
                                                name="cep"
                                                value={address.cep}
                                                onChange={handleAddressChange}
                                                onBlur={handleCepBlur}
                                                maxLength={8}
                                                placeholder="00000-000"
                                                required
                                            />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Cidade</label>
                                            <input style={styles.input} name="city" value={address.city} onChange={handleAddressChange} readOnly />
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Rua</label>
                                        <input style={styles.input} name="street" value={address.street} onChange={handleAddressChange} required />
                                    </div>

                                    <div style={styles.row}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Número</label>
                                            <input style={styles.input} name="number" value={address.number} onChange={handleAddressChange} required />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Complemento</label>
                                            <input style={styles.input} name="complement" value={address.complement} onChange={handleAddressChange} />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        style={styles.btnPrimary}
                                    >
                                        Continuar para Pagamento <ArrowRight size={20} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <h2 style={styles.sectionTitle}><CreditCard className="text-orange-500" /> Pagamento</h2>

                                    <div style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '1rem', border: '1px solid rgba(168, 85, 247, 0.2)', marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <ShieldCheck size={24} color="#a855f7" />
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>Pagamento Seguro</div>
                                                <div style={{ fontSize: '0.75rem', color: '#a1a1a1' }}>Seus dados são criptografados com jutsu de selamento.</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Nome no Cartão</label>
                                        <input style={styles.input} name="holderName" value={payment.holderName} onChange={handlePaymentChange} placeholder="COMO ESTÁ NO CARTÃO" required />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Número do Cartão</label>
                                        <input style={styles.input} name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} placeholder="0000 0000 0000 0000" maxLength={19} required />
                                    </div>

                                    <div style={styles.row}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Validade</label>
                                            <input style={styles.input} name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/AA" maxLength={5} required />
                                        </div>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>CVV</label>
                                            <input style={styles.input} name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="123" maxLength={4} required />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            style={{ ...styles.btnPrimary, background: 'rgba(255,255,255,0.05)', color: '#a1a1a1' }}
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            style={{ ...styles.btnPrimary, marginTop: 0 }}
                                        >
                                            {loading ? <Loader className="animate-spin" /> : <CheckCircle />}
                                            Finalizar Pedido
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Right Column: Summary */}
                <div>
                    <div style={styles.summaryCard}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>Resumo do Pedido</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '4rem', height: '4rem', background: '#222', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                        <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{item.product.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#a1a1a1' }}>Qtd: {item.quantity} {item.size && `• ${item.size}`}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--naruto-orange)' }}>{formatCurrency(item.product.price)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>{formatCurrency(cartTotal)}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Frete (Ninja Express)</span>
                            <span>R$ 15,90</span>
                        </div>

                        <div style={styles.totalRow}>
                            <span>Total</span>
                            <span>{formatCurrency(cartTotal + 15.90)}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.75rem', color: '#22c55e', fontSize: '0.8125rem' }}>
                            <Truck size={16} /> Chega em até 3 dias úteis
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Step = ({ active, number, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: active ? 1 : 0.5 }}>
        <div style={{
            width: '2rem', height: '2rem', borderRadius: '50%',
            background: active ? 'var(--naruto-orange)' : '#333',
            color: 'white', fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {number}
        </div>
        <span style={{ fontWeight: 700, color: 'white' }}>{title}</span>
    </div>
);

export default CheckoutPage;
