import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from '../pages/Home';
import ProductCatalog from '../pages/ProductCatalog';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import Checkout from '../pages/Checkout';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import OAuth2RedirectHandler from '../pages/OAuth2RedirectHandler';
import MentionsLegales from '../pages/MentionsLegales';
import CGV from '../pages/CGV';
import ClientOrders from '../pages/ClientOrders';
import ClientMessages from '../pages/ClientMessages';
import UserProfile from '../pages/UserProfile';
import Payment from '../pages/Payment';

// Admin
import AdminLayout from './AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductList from '../pages/admin/ProductList';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import Orders from '../pages/admin/Orders';
import Categories from '../pages/admin/Categories';
import Customers from '../pages/admin/Customers';
import Analytics from '../pages/admin/Analytics';
import Settings from '../pages/admin/Settings';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    in: {
        opacity: 1,
        y: 0,
    },
    out: {
        opacity: 0,
        y: -20,
    }
};

const pageTransition = {
    type: "tween",
    ease: "circOut",
    duration: 0.3
};

const AnimatedRoute = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
    >
        {children}
    </motion.div>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
                <Route path="/products" element={<AnimatedRoute><ProductCatalog /></AnimatedRoute>} />
                <Route path="/products/:id" element={<AnimatedRoute><ProductDetails /></AnimatedRoute>} />
                <Route path="/cart" element={<AnimatedRoute><Cart /></AnimatedRoute>} />
                <Route path="/wishlist" element={<AnimatedRoute><Wishlist /></AnimatedRoute>} />
                <Route path="/checkout" element={<AnimatedRoute><Checkout /></AnimatedRoute>} />
                <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
                <Route path="/login" element={<AnimatedRoute><Login /></AnimatedRoute>} />
                <Route path="/oauth2/redirect" element={<AnimatedRoute><OAuth2RedirectHandler /></AnimatedRoute>} />
                <Route path="/register" element={<AnimatedRoute><Register /></AnimatedRoute>} />
                <Route path="/account/orders" element={<AnimatedRoute><ClientOrders /></AnimatedRoute>} />
                <Route path="/account/messages" element={<AnimatedRoute><ClientMessages /></AnimatedRoute>} />
                <Route path="/account/profile" element={<AnimatedRoute><UserProfile /></AnimatedRoute>} />
                <Route path="/profile" element={<AnimatedRoute><UserProfile /></AnimatedRoute>} />
                <Route path="/payment" element={<AnimatedRoute><Payment /></AnimatedRoute>} />
                <Route path="/mentions-legales" element={<AnimatedRoute><MentionsLegales /></AnimatedRoute>} />
                <Route path="/cgv" element={<AnimatedRoute><CGV /></AnimatedRoute>} />

                {/* Admin Routes - No explicit animation per sub-route to keep dashboard snappy, or animate the layout */}
                <Route path="/admin" element={<AnimatedRoute><AdminLayout /></AnimatedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/new" element={<AddProduct />} />
                    <Route path="products/edit/:id" element={<EditProduct />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
