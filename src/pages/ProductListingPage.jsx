/**
 * 🛍️ Página de Listagem de Produtos
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductListingPage = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['todos', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p =>
    (filter === 'todos' || p.category === filter) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className="premium-container">
        {/* Header */}
        <header style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">
              <Filter size={14} />
              Catálogo Completo
            </span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
              Arsenal Ninja
            </h1>
            <p className="hero-description" style={{ maxWidth: '600px' }}>
              Ferramentas de precisão e vestuário de elite para shinobis exigentes.
              Selecione seu equipamento para a próxima missão.
            </p>
          </motion.div>

          {/* Controls */}
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', maxWidth: '500px' }}>
              <Search
                style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar equipamento (ex: Kunai, Bandana)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '1rem',
                  padding: '1rem 1rem 1rem 3.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--naruto-orange)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>

            {/* Categories */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '1rem',
              scrollbarWidth: 'none' // Firefox
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid',
                    borderColor: filter === cat ? 'var(--naruto-orange)' : 'var(--border-light)',
                    background: filter === cat ? 'rgba(255, 107, 0, 0.1)' : 'var(--bg-card)',
                    color: filter === cat ? 'var(--naruto-orange)' : 'var(--text-muted)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Grid */}
        <motion.div
          layout
          className="products-grid"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '8rem 0',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Search size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>Nenhum item encontrado</h3>
            <p>Tente buscar por outro termo ou categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
