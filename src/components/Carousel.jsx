import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { carouselData } from '../data/carouselData';

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrent((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));

    return (
        <div style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url(${carouselData[current].image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 5vw'
                    }}
                >
                    <div className="premium-container" style={{ width: '100%' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            style={{ maxWidth: '40rem' }}
                        >
                            <span style={{ color: '#a855f7', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.75rem', marginBottom: '1rem', display: 'block' }}>
                                {carouselData[current].subtitle}
                            </span>
                            <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1, marginBottom: '2rem', letterSpacing: '-0.05em' }}>
                                {carouselData[current].title}
                            </h2>
                            <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.6 }}>
                                {carouselData[current].description}
                            </p>
                            <Link to={carouselData[current].link}>
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '1.25rem 3rem',
                                        background: '#fff',
                                        color: '#000',
                                        fontWeight: 900,
                                        borderRadius: '9999px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    {carouselData[current].cta} <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div style={{ position: 'absolute', bottom: '4rem', right: '5vw', display: 'flex', gap: '1rem' }}>
                <button onClick={prev} style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={24} />
                </button>
            </div>

            <div style={{ position: 'absolute', bottom: '4rem', left: '5vw', display: 'flex', gap: '0.5rem' }}>
                {carouselData.map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i === current ? '3rem' : '0.5rem',
                            height: '4px',
                            background: i === current ? '#a855f7' : 'rgba(255,255,255,0.2)',
                            borderRadius: '2px',
                            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
