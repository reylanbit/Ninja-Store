/**
 * 🍥 Footer Temático - Ninja Store
 */

import { Mail, Instagram, Twitter, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const styles = {
        footer: {
            padding: '6rem 0 2rem',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: 'auto'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem'
        },
        brand: {
            marginBottom: '1.5rem'
        },
        logo: {
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            display: 'block'
        },
        description: {
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            fontSize: '0.9375rem',
            maxWidth: '300px'
        },
        sectionTitle: {
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'white',
            marginBottom: '1.5rem'
        },
        links: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        },
        link: {
            color: 'var(--text-muted)',
            fontSize: '0.9375rem',
            textDecoration: 'none',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        social: {
            display: 'flex',
            gap: '1rem'
        },
        socialIcon: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a1a1a1',
            transition: 'all 0.2s',
            cursor: 'pointer'
        },
        bottom: {
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        copyright: {
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
        }
    };

    return (
        <footer style={styles.footer}>
            <div className="premium-container">
                <div style={styles.grid}>
                    {/* Brand */}
                    <div>
                        <Link to="/" style={styles.logo}>
                            NINJA<span style={{ color: 'var(--naruto-orange)' }}>STORE</span>
                        </Link>
                        <p style={styles.description}>
                            Equipamentos de elite para shinobis que buscam excelência.
                            Da Vila da Folha diretamente para o seu arsenal.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={styles.sectionTitle}>Explorar</h4>
                        <div style={styles.links}>
                            <Link to="/products" style={styles.link}>Arsenal Completo</Link>
                            <Link to="/products?category=Camisetas" style={styles.link}>Vestuário Ninja</Link>
                            <Link to="/products?category=Acessórios" style={styles.link}>Armas & Acessórios</Link>
                            <Link to="/products?category=Decoração" style={styles.link}>Decoração</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={styles.sectionTitle}>Contato</h4>
                        <div style={styles.links}>
                            <a href="#" style={styles.link}>
                                <MapPin size={16} /> Konohagakure, País do Fogo
                            </a>
                            <a href="#" style={styles.link}>
                                <Mail size={16} /> contato@ninjastore.com
                            </a>
                            <a href="#" style={styles.link}>
                                <Phone size={16} /> (11) 99999-9999
                            </a>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 style={styles.sectionTitle}>Redes Sociais</h4>
                        <div style={styles.social}>
                            <a href="#" style={styles.socialIcon} onMouseEnter={e => e.currentTarget.style.background = 'var(--naruto-orange)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                <Instagram size={20} />
                            </a>
                            <a href="#" style={styles.socialIcon} onMouseEnter={e => e.currentTarget.style.background = 'var(--naruto-orange)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                <Twitter size={20} />
                            </a>
                            <a href="#" style={styles.socialIcon} onMouseEnter={e => e.currentTarget.style.background = 'var(--naruto-orange)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div style={styles.bottom}>
                    <div style={styles.copyright}>
                        © 2026 Ninja Store. Todos os direitos reservados.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            <ShieldCheck size={14} color="var(--naruto-orange)" />
                            AMBU SECURITY CHECKED
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
