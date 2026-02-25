import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import CartDrawer from './components/CartDrawer';
import AnimatedRoutes from './components/AnimatedRoutes';
import AntigravityCursor from './components/AntigravityCursor';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {!isAdminRoute && <Navbar />}
            {!isAdminRoute && <CartDrawer />}
            <main className={`${isAdminRoute ? '' : 'pb-20'} ${location.pathname !== '/' && !isAdminRoute ? 'pt-28' : ''}`}>
              <AnimatedRoutes />
            </main>

            {!isAdminRoute && <Footer />}

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#0f172a',
                  fontWeight: '500',
                },
              }}
            />
            <CookieConsent />
            <AntigravityCursor />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
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
