import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from './CartSidebar';

const Layout = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onOpenCart={() => setIsCartOpen(true)} />
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <main style={{ flex: 1 }}>
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
