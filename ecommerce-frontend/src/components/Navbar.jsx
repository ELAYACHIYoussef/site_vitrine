import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight">
                SITE<span className="text-dark">VITRINE</span>
            </Link>

            <div className="hidden md:flex space-x-8 items-center font-medium">
                <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                <Link to="/products" className="hover:text-primary transition-colors">Produits</Link>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-5">
                <div className="flex space-x-3 items-center border-r pr-5 mr-2">
                    <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
                    <div className="relative">
                        <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </div>
                </div>

                {isAuthenticated() ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/profile" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-all">
                            <User className="w-4 h-4" />
                            <span>{user?.username}</span>
                        </Link>
                        <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-semibold hover:text-primary">Connexion</Link>
                        <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
                            S'inscrire
                        </Link>
                    </div>
                )}

                <Menu className="w-6 h-6 md:hidden cursor-pointer" />
            </div>
        </nav>
    );
};

export default Navbar;
