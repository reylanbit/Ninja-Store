/**
 * 🛍️ Product Card Component
 */

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    // Styles are defined in index.css (.product-card, etc) to keep this component clean
    // or we can use inline styles if dynamic behavior is needed NOT covered by classes.
    // The previous css implementation covered specific .product-card classes.
    // Let's verify index.css coverage.
    // I added .product-card styles in index.css step 88.

    return (
        <Link to={`/product/${product.id}`} style={{ display: 'block', height: '100%' }}>
            <motion.div
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
            >
                {/* Image Container */}
                <div className="product-card-image">
                    <img src={product.image} alt={product.name} />

                    {/* Badges */}
                    <div className="product-card-badges">
                        {product.featured && (
                            <span className="product-badge featured" style={{ background: '#FFD700', color: 'black' }}>
                                Destaque
                            </span>
                        )}
                        {product.discount > 0 && (
                            <span className="product-badge sale">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Overlay */}
                    <div className="product-card-action">
                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <ShoppingCart size={18} />
                            Adicionar
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="product-card-content">
                    <span className="product-card-category">
                        {product.category}
                    </span>

                    <h3 className="product-card-title" title={product.name}>
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="product-card-rating">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating || 5) ? "#FFD700" : "none"}
                                color="#FFD700"
                            />
                        ))}
                        <span style={{ fontSize: '0.75rem', marginLeft: '0.25rem' }}>
                            ({product.reviews || 0})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="product-card-price">
                        <span className="current">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                            <span className="original">
                                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
