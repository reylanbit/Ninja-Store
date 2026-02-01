import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './src/pages/HomePage';
import ProductListingPage from './src/pages/ProductListingPage';
import ProductViewPage from './src/pages/ProductViewPage';
import CheckoutPage from './src/pages/CheckoutPage';
import OrderSuccessPage from './src/pages/OrderSuccessPage';
import UserAuthPage from './src/pages/UserAuthPage';
import { CartProvider } from './src/contexts/CartContext';
import Layout from './src/components/Layout';

// Admin Pages
import AdminLogin from './src/pages/admin/AdminLogin';
import AdminDashboard from './src/pages/admin/AdminDashboard';
import AdminProducts from './src/pages/admin/AdminProducts';
import AdminOrders from './src/pages/admin/AdminOrders';
import AdminUsers from './src/pages/admin/AdminUsers';

function App() {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    {/* Store Routes */}
                    <Route path="/" element={<Layout><HomePage /></Layout>} />
                    <Route path="/products" element={<Layout><ProductListingPage /></Layout>} />
                    <Route path="/product/:id" element={<Layout><ProductViewPage /></Layout>} />
                    <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
                    <Route path="/order-success" element={<Layout><OrderSuccessPage /></Layout>} />
                    <Route path="/login" element={<Layout><UserAuthPage /></Layout>} />
                    <Route path="/register" element={<Layout><UserAuthPage /></Layout>} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route element={<AdminDashboard />}>
                        <Route path="/admin/dashboard" element={<div />} /> {/* Stats rendered by Dashboard component */}
                        <Route path="/admin/products" element={<AdminProducts />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                    </Route>
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;