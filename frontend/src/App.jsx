import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import CookieConsent from './components/CookieConsent';
import CartDrawer from './components/CartDrawer';
import AnimatedRoutes from './components/AnimatedRoutes';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {!isAdminRoute && <Navbar />}
            <main className={isAdminRoute ? '' : 'pb-20'}>
              <AnimatedRoutes />
            </main>

            {!isAdminRoute && <Footer />}

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#0f172a',
                  fontWeight: '500',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            import CartDrawer from './components/CartDrawer';

            // ... (in AppContent)

            <CookieConsent />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div >
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
