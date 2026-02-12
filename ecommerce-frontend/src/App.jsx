import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import AddProduct from './pages/admin/AddProduct';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="orders" element={<div className="p-8">Orders Admin Page (Coming Soon)</div>} />
            <Route path="customers" element={<div className="p-8">Customers Admin Page (Coming Soon)</div>} />
            <Route path="analytics" element={<div className="p-8">Analytics Admin Page (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-8">Settings Admin Page (Coming Soon)</div>} />
          </Route>

          {/* Add more routes here as we migrate them */}
        </Routes>
      </main>

      <footer className="py-10 border-t bg-white text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} SITE VITRINE E-COMMERCE. Tous droits réservés.
      </footer>
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
