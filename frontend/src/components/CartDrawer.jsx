import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { staggerContainer, staggerItem, slideInRight } from '../hooks/animations';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart
    } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={slideInRight}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                                Mon Panier <span className="text-sm font-medium text-slate-400">({cart.length})</span>
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="flex-1 overflow-y-auto p-6 space-y-6"
                        >
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-medium text-lg">Votre panier est vide</p>
                                        <p className="text-slate-500 text-sm mt-1">Découvrez nos produits et commencez votre shopping !</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="px-6 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-full hover:bg-indigo-100 transition-colors mt-4"
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        variants={staggerItem}
                                        exit={{ opacity: 0, x: -50 }}
                                        key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-indigo-100 group"
                                    >
                                        {/* Image */}
                                        <div className="w-24 h-32 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                                            <img
                                                src={item.thumbnail || item.image || item.images?.[0]}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-slate-800 line-clamp-1">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {item.selectedSize} · {item.selectedColor}
                                                </p>
                                                <p className="text-indigo-600 font-bold mt-1">
                                                    {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center bg-white rounded-full shadow-sm border border-slate-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </motion.div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Sous-total</span>
                                        <span>{cartTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Livraison</span>
                                        <span className="text-green-600 font-medium">Offerte</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-dashed border-slate-200">
                                        <span>Total</span>
                                        <span>{cartTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group transition-all hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow"
                                >
                                    Passer la commande
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    Paiement 100% sécurisé
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
