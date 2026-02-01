/**
 * 🍥 Homepage Temática Naruto
 * 
 * Design imersivo com elementos do universo Naruto
 * Hero section dinâmica, categorias visuais e produtos em destaque
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, ShieldCheck, Star, ChevronRight,
  Flame, Wind, Sparkles, Package, Truck
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, featuredProducts, onSale } from '../data/products';

const HomePage = () => {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Hero slides data
  const heroSlides = [
    {
      title: "O Caminho do Ninja",
      subtitle: "Coleção Exclusiva 2024",
      description: "Equipamentos e vestuário para verdadeiros shinobis. Qualidade que honra a Vila da Folha.",
      cta: "Explorar Coleção",
      gradient: "linear-gradient(135deg, #FF6B00 0%, #8B0000 100%)",
      bgImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920"
    },
    {
      title: "Akatsuki Rising",
      subtitle: "Edição Limitada",
      description: "Nuvens vermelhas, poder absoluto. A coleção mais sombria e desejada chegou.",
      cta: "Ver Akatsuki",
      gradient: "linear-gradient(135deg, #8B0000 0%, #1a1a1a 100%)",
      bgImage: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1920"
    },
    {
      title: "Clã Uchiha",
      subtitle: "Desperte seu Sharingan",
      description: "A linhagem mais poderosa em forma de produtos exclusivos. Apenas para a elite.",
      cta: "Descobrir",
      gradient: "linear-gradient(135deg, #1a1a3e 0%, #8B0000 100%)",
      bgImage: "https://images.unsplash.com/photo-1594387303756-deb3703e6f19?w=1920"
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* ===========================
                HERO SECTION
            =========================== */}
      <section className="hero-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHeroSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-slide"
            style={{
              background: heroSlides[activeHeroSlide].gradient
            }}
          >
            {/* Decorative elements */}
            <div className="hero-particles">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="particle"
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${50 + Math.random() * 50}%`
                  }}
                />
              ))}
            </div>

            {/* Konoha symbol watermark */}
            <div className="hero-watermark">
              <svg viewBox="0 0 100 100" className="konoha-symbol">
                <path d="M50 5 L60 35 L95 50 L60 65 L50 95 L40 65 L5 50 L40 35 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            <div className="hero-content premium-container">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hero-text"
              >
                <span className="hero-badge">
                  <Sparkles size={14} />
                  {heroSlides[activeHeroSlide].subtitle}
                </span>
                <h1 className="hero-title">
                  {heroSlides[activeHeroSlide].title}
                </h1>
                <p className="hero-description">
                  {heroSlides[activeHeroSlide].description}
                </p>
                <Link to="/products" className="hero-cta">
                  {heroSlides[activeHeroSlide].cta}
                  <ChevronRight size={20} />
                </Link>
              </motion.div>
            </div>

            {/* Slide indicators */}
            <div className="hero-indicators">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === activeHeroSlide ? 'active' : ''}`}
                  onClick={() => setActiveHeroSlide(index)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ===========================
                TRUST BADGES
            =========================== */}
      <section className="trust-section">
        <div className="premium-container">
          <div className="trust-badges">
            <div className="trust-badge">
              <Truck size={24} />
              <div>
                <strong>Frete Grátis</strong>
                <span>Acima de R$200</span>
              </div>
            </div>
            <div className="trust-badge">
              <ShieldCheck size={24} />
              <div>
                <strong>Pagamento Seguro</strong>
                <span>100% Protegido</span>
              </div>
            </div>
            <div className="trust-badge">
              <Package size={24} />
              <div>
                <strong>Qualidade Premium</strong>
                <span>Produtos Originais</span>
              </div>
            </div>
            <div className="trust-badge">
              <Star size={24} />
              <div>
                <strong>+10.000 Clientes</strong>
                <span>Satisfeitos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
                CATEGORIES SECTION
            =========================== */}
      <section className="categories-section">
        <div className="premium-container">
          <div className="section-header">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="section-badge"
            >
              <Flame size={14} />
              Explore por Categoria
            </motion.span>
            <h2 className="section-title">Encontre Seu Estilo Ninja</h2>
          </div>

          <div className="categories-grid">
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  className="category-card"
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                  <ChevronRight size={16} className="category-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
                FEATURED PRODUCTS
            =========================== */}
      <section className="featured-section">
        <div className="premium-container">
          <div className="section-header">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="section-badge"
            >
              <Star size={14} />
              Mais Vendidos
            </motion.span>
            <h2 className="section-title">Produtos em Destaque</h2>
            <Link to="/products" className="section-link">
              Ver Todos <ChevronRight size={16} />
            </Link>
          </div>

          <div className="products-grid">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
                PROMO BANNER
            =========================== */}
      <section className="promo-section">
        <div className="premium-container">
          <motion.div
            className="promo-banner"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <div className="promo-content">
              <span className="promo-badge">🔥 Oferta Limitada</span>
              <h2>Moletom Akatsuki</h2>
              <p>20% OFF na compra do moletom mais desejado do universo ninja!</p>
              <div className="promo-price">
                <span className="original-price">R$ 199,90</span>
                <span className="sale-price">R$ 159,90</span>
              </div>
              <Link to="/product/5" className="promo-cta">
                Aproveitar Oferta
              </Link>
            </div>
            <div className="promo-image">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
                alt="Moletom Akatsuki"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===========================
                ON SALE PRODUCTS
            =========================== */}
      {onSale.length > 0 && (
        <section className="sale-section">
          <div className="premium-container">
            <div className="section-header">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="section-badge sale"
              >
                <Zap size={14} />
                Ofertas Imperdíveis
              </motion.span>
              <h2 className="section-title">Em Promoção</h2>
            </div>

            <div className="products-grid">
              {onSale.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===========================
                FEATURES SECTION
            =========================== */}
      <section className="features-section">
        <div className="premium-container">
          <div className="section-header centered">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="section-badge"
            >
              <Wind size={14} />
              Excelência Shinobi
            </motion.span>
            <h2 className="section-title">Por Que Somos a Escolha dos Lendários?</h2>
          </div>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="feature-icon">
                <Zap />
              </div>
              <h3>Logística Kamui</h3>
              <p>Entregas tão rápidas que parecem teletransporte. Seu arsenal chega antes da próxima missão.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="feature-icon">
                <ShieldCheck />
              </div>
              <h3>Selo de Konoha</h3>
              <p>Cada item é forjado com precisão e passa por inspeções de qualidade dignas de um Hokage.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="feature-icon">
                <Star />
              </div>
              <h3>Arsenal Exclusivo</h3>
              <p>Apenas produtos de elite, selecionados para shinobis que não aceitam o comum.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===========================
                NEWSLETTER
            =========================== */}
      <section className="newsletter-section">
        <div className="premium-container">
          <motion.div
            className="newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="newsletter-content">
              <h2>Junte-se ao Clã</h2>
              <p>Receba ofertas exclusivas, lançamentos e novidades diretamente no seu email.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  Inscrever-se
                </button>
              </form>
              <span className="newsletter-note">
                🎁 Ganhe 10% OFF na primeira compra!
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
