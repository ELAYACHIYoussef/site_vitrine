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
                {user?.role === 'admin' ? (
                    // Admin: Search bar instead of navigation
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 pr-4 py-2 rounded-full bg-slate-100 border border-transparent focus:border-indigo-600 focus:bg-white transition-all outline-none w-64"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    // Client: Regular navigation
                    <>
                        <Link to="/" className="hover:text-indigo-600 transition-colors relative group">
                            Accueil
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                        </Link>
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
                {user?.role === 'admin' ? (
                    // Admin: Notifications + Profile
                    <div className="flex items-center space-x-4">
                        <div className="relative cursor-pointer group">
                            <svg className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md font-bold">3</span>
                        </div>
                        <Link
                            to="/admin"
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
                    // Client: Cart, Wishlist, Profile
                    <>
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
                                    to="/"
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
                    </>
                )}

                <Menu className="w-6 h-6 md:hidden cursor-pointer text-slate-900" />
            </div>
        </nav>
    );
};

export default Navbar;
