import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Heart, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="glass-nav px-6 py-4 flex justify-between items-center transition-all duration-300">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-2 group">
                <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg shadow-lg group-hover:rotate-12 transition-transform">V</span>
                <span className="text-slate-900">VITRINE<span className="text-indigo-600">.IO</span></span>
            </Link>

            <div className="hidden md:flex space-x-10 items-center font-medium text-slate-600">
                <Link to="/" className="hover:text-indigo-600 transition-colors relative group">
                    Accueil
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                </Link>

                {user?.role === 'admin' ? (
                    // Navigation ADMIN
                    <>
                        <Link to="/admin" className="hover:text-indigo-600 transition-colors relative group">
                            Dashboard
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/admin/products" className="hover:text-indigo-600 transition-colors relative group">
                            Produits
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/admin/orders" className="hover:text-indigo-600 transition-colors relative group">
                            Commandes
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/admin/customers" className="hover:text-indigo-600 transition-colors relative group">
                            Clients
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                    </>
                ) : (
                    // Navigation CLIENT
                    <>
                        <Link to="/products" className="hover:text-indigo-600 transition-colors relative group">
                            Produits
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                        <Link to="/contact" className="hover:text-indigo-600 transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
                    </>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex space-x-4 items-center border-r border-slate-200 pr-6 mr-2">
                    <Heart className="w-5 h-5 cursor-pointer text-slate-400 hover:text-rose-500 hover:scale-110 transition-all" />
                    <div className="relative group">
                        <ShoppingCart className="w-5 h-5 cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">0</span>
                    </div>
                </div>

                {isAuthenticated() ? (
                    <div className="flex items-center space-x-4">
                        <Link
                            to={user?.role === 'admin' ? '/admin' : '/'}
                            className="flex items-center space-x-2 text-sm font-semibold text-slate-700 bg-slate-100 px-4 py-2 rounded-full hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-200"
                        >
                            <User className="w-4 h-4" />
                            <span>{user?.username}</span>
                        </Link>
                        <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Connexion</Link>
                        <Link to="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            S'inscrire
                        </Link>
                    </div>
                )}

                <Menu className="w-6 h-6 md:hidden cursor-pointer text-slate-900" />
            </div>
        </nav>
    );
};

export default Navbar;
