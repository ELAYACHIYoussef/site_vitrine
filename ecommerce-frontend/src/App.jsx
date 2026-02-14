import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ClientOrders from './pages/ClientOrders';
import Payment from './pages/Payment';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import Orders from './pages/admin/Orders';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account/orders" element={<ClientOrders />} />
              <Route path="/payment" element={<Payment />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
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

              {/* Add more routes here as we migrate them */}
            </Routes>
          </main>

          <footer className="py-10 border-t bg-white text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SITE VITRINE E-COMMERCE. Tous droits réservés.
          </footer>

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
