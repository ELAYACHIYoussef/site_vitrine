import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGlobalConfig } from '../api/configService';

import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Heart, User, LogOut, Menu, Package, MessageCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState('AZYMARKET');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        getGlobalConfig().then(config => {
            if (config?.STORE_NAME) setStoreName(config.STORE_NAME.toUpperCase());
        });

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAdmin = user && (user.role === 'admin' || user.role === 'ROLE_ADMIN' || user.role === 'ADMIN');

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
            ? 'py-4 bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 shadow-xl shadow-slate-900/5'
            : 'py-8 bg-transparent'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-4 group">
                    <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-900/20"
                    >
                        <ShoppingBag size={24} />
                    </motion.div>
                    <span className="text-2xl font-[1000] tracking-tighter text-slate-900">
                        {storeName}
                    </span>
                </Link>

                {/* Main Navigation */}
                <div className="hidden lg:flex items-center gap-12">
                    {[
                        { name: 'Collections', path: '/products' },
                        { name: 'Nouveautés', path: '/products?sort=newest' },
                        { name: 'Contact', path: '/contact' },
                    ].map((link, i) => (
                        <Link
                            key={i}
                            to={link.path}
                            className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                        </Link>
                    ))}
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/wishlist')}
                            className="p-3 text-slate-600 rounded-2xl relative"
                        >
                            <Heart size={20} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                            {wishlist.length > 0 && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.05)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(true)}
                            className="p-3 text-slate-600 rounded-2xl relative"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </motion.button>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

                    {isAuthenticated() ? (
                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <Link to="/admin" className="hidden xl:block px-6 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all hover:-translate-y-0.5">
                                    Admin
                                </Link>
                            )}
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full border-2 border-white shadow-xl overflow-hidden ring-4 ring-slate-50 group-hover:ring-indigo-50 transition-all">
                                    <img
                                        src={user?.avatarUrl || `https://i.pravatar.cc/100?u=${user?.id}`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.1, color: '#e11d48' }}
                                onClick={() => { logout(); navigate('/'); }}
                                className="p-2 text-slate-400"
                            >
                                <LogOut size={20} />
                            </motion.button>
                        </div>
                    ) : (
                        <Link to="/login" className="px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-2xl shadow-slate-900/10 hover:bg-indigo-600 transition-all hover:-translate-y-0.5 active:scale-95">
                            Connexion
                        </Link>
                    )}

                    <button className="lg:hidden p-3 text-slate-900">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
