/**
 * 📦 Página de Detalhes do Produto
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../services/cartServices';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, Star, Zap } from 'lucide-react';

const ProductViewPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : '');

    if (!product) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
                <Link to="/products" className="text-orange-500 hover:underline">Voltar ao Arsenal</Link>
            </div>
        </div>
    );

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize
        });
    };

    const styles = {
        container: {
            paddingTop: '10rem',
            paddingBottom: '8rem',
            minHeight: '100vh'
        },
        backLink: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '4rem',
            textDecoration: 'none',
            transition: 'color 0.2s'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Mobile responsive
            gap: '5rem',
            alignItems: 'start'
        },
        imageContainer: {
            position: 'relative',
            borderRadius: '2rem',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-card)',
            aspectRatio: '1/1',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        content: {
            display: 'flex',
            flexDirection: 'column'
        },
        category: {
            color: 'var(--naruto-orange)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: '0.875rem',
            marginBottom: '1rem'
        },
        title: {
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        price: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'white',
            marginBottom: '2rem'
        },
        descriptionBox: {
            padding: '2rem',
            background: 'var(--bg-card)',
            borderRadius: '1.5rem',
            border: '1px solid var(--border-light)',
            marginBottom: '3rem'
        },
        descriptionText: {
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            fontSize: '1rem'
        },
        actionArea: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        },
        sizeGrid: {
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
        },
        sizeBtn: (active) => ({
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '1rem',
            border: active ? '1px solid var(--naruto-orange)' : '1px solid var(--border-light)',
            background: active ? 'rgba(255, 107, 0, 0.1)' : 'transparent',
            color: active ? 'var(--naruto-orange)' : 'var(--text-muted)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),
        addToCartBtn: {
            padding: '1.5rem',
            background: 'var(--naruto-orange)',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.125rem',
            borderRadius: '1rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            transition: 'transform 0.2s, box-shadow 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: '0 10px 30px -10px rgba(255, 107, 0, 0.5)'
        }
    };

    return (
        <div style={styles.container}>
            <div className="premium-container">
                <Link to="/products" style={styles.backLink} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                    <ArrowLeft size={16} /> Voltar ao Arsenal
                </Link>

                <div style={styles.grid}>
                    {/* Imagem */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div style={styles.imageContainer}>
                            <img src={product.image} alt={product.name} style={styles.image} />
                            {/* Tags overlay could go here */}
                        </div>
                    </motion.div>

                    {/* Detalhes */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={styles.content}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={styles.category}>{product.category}</span>
                            <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                                <Star size={14} fill="currentColor" /> {product.rating}
                            </div>
                        </div>

                        <h1 style={styles.title}>{product.name}</h1>
                        <div style={styles.price}>{formatCurrency(product.price)}</div>

                        <div style={styles.descriptionBox}>
                            <p style={styles.descriptionText}>
                                {product.fullDescription || product.description}
                            </p>
                        </div>

                        <div style={styles.actionArea}>
                            {/* Tamanhos */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                                        Tamanho
                                    </h4>
                                    <div style={styles.sizeGrid}>
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                style={styles.sizeBtn(selectedSize === size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                                <FeatureItem icon={<Truck size={20} />} title="Entrega Ninja" sub="Envio Rápido" />
                                <FeatureItem icon={<ShieldCheck size={20} />} title="Garantia" sub="Qualidade Comprovada" />
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(255, 107, 0, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                style={styles.addToCartBtn}
                            >
                                <ShoppingCart size={22} />
                                Adicionar ao Carrinho
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, sub }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{
            width: '3rem', height: '3rem',
            background: 'var(--bg-card)',
            borderRadius: '0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--naruto-orange)',
            border: '1px solid var(--border-light)'
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'white' }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub}</div>
        </div>
    </div>
);

export default ProductViewPage;
