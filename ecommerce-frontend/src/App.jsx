import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            {/* Add more routes here as we migrate them */}
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="py-10 border-t bg-white text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SITE VITRINE E-COMMERCE. Tous droits réservés.
        </footer>
      </div>
    </Router>
  );
}

export default App;
