import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../hooks/animations';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Votre panier est vide</h2>
                <p className="text-slate-500 mb-8 max-w-md">
                    Il semble que vous n'ayez pas encore ajouté de produits à votre panier.
                    Explorez notre catalogue pour trouver votre bonheur !
                </p>
                <Link
                    to="/"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Commencer mes achats
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <motion.h1
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-3xl font-extrabold text-slate-900 mb-8"
            >
                Mon Panier ({cart.length} articles)
            </motion.h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="space-y-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    variants={staggerItem}
                                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl hover:shadow-slate-100 transition-all"
                                >
                                    {/* Product Image */}
                                    <div className="w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                                        {item.thumbnail ? (
                                            <img
                                                src={getImageUrl(item.thumbnail)}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <ShoppingBag size={24} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <Link to={`/products/${item.id}`} className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                                            {item.name}
                                        </Link>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                                            {item.selectedSize && <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">Taille: {item.selectedSize}</span>}
                                            {item.selectedColor && <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">Couleur: {item.selectedColor}</span>}
                                        </div>
                                        <p className="text-indigo-600 font-extrabold mt-3 text-lg">
                                            {item.price?.toFixed(2)} €
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-1.5 border border-slate-100">
                                        <motion.button
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-all disabled:opacity-30"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </motion.button>
                                        <span className="w-6 text-center font-bold text-slate-700">{item.quantity}</span>
                                        <motion.button
                                            whileTap={{ scale: 0.8 }}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-all"
                                        >
                                            <Plus size={16} />
                                        </motion.button>
                                    </div>

                                    {/* Subtotal & Remove */}
                                    <div className="text-right min-w-[120px] flex flex-col items-end gap-3">
                                        <p className="font-black text-slate-900 text-xl">
                                            {(item.price * item.quantity).toFixed(2)} €
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-slate-300 transition-colors p-2 hover:bg-rose-50 rounded-xl"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={20} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-between items-center pt-8"
                    >
                        <Link to="/" className="text-slate-500 hover:text-indigo-600 font-bold flex items-center gap-2 group transition-colors">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Continuer mes achats
                        </Link>
                        <button
                            onClick={clearCart}
                            className="text-rose-500 hover:text-rose-700 text-sm font-bold hover:underline bg-rose-50 px-4 py-2 rounded-full transition-colors"
                        >
                            Vider le panier
                        </button>
                    </motion.div>
                </div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full lg:w-96"
                >
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 sticky top-24 overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        <h2 className="text-2xl font-black text-slate-900 mb-8">Résumé</h2>

                        <div className="space-y-5 mb-8">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Sous-total</span>
                                <span className="text-slate-900">{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Livraison</span>
                                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">Gratuite</span>
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Total TTC</span>
                                <motion.span
                                    key={cartTotal}
                                    initial={{ scale: 1.1, color: '#4f46e5' }}
                                    animate={{ scale: 1, color: '#4f46e5' }}
                                    className="text-3xl font-black"
                                >
                                    {cartTotal.toFixed(2)} €
                                </motion.span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3 animate-pulse-glow"
                        >
                            Passer la commande
                            <ArrowRight size={22} />
                        </motion.button>

                        <div className="mt-8 flex items-center justify-between opacity-30 px-2">
                            <div className="w-12 h-8 bg-slate-200 rounded-md"></div>
                            <div className="w-12 h-8 bg-slate-200 rounded-md"></div>
                            <div className="w-12 h-8 bg-slate-200 rounded-md"></div>
                            <div className="w-12 h-8 bg-slate-200 rounded-md"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Cart;
