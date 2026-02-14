import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Mon Panier ({cart.length} articles)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow"
                        >
                            {/* Product Image */}
                            <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                                {item.thumbnail ? (
                                    <img
                                        src={getImageUrl(item.thumbnail)}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <ShoppingBag size={24} />
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <Link to={`/products/${item.id}`} className="text-lg font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                                    {item.name}
                                </Link>
                                <p className="text-slate-500 text-sm mt-1">{item.category}</p>
                                <p className="text-indigo-600 font-bold mt-2 text-lg">
                                    {item.price?.toFixed(2)} €
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center font-semibold text-slate-700">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Subtotal & Remove */}
                            <div className="text-right min-w-[100px] flex flex-col items-end gap-2">
                                <p className="font-bold text-slate-900">
                                    {(item.price * item.quantity).toFixed(2)} €
                                </p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                    title="Supprimer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4">
                        <Link to="/" className="text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-2">
                            ← Continuer mes achats
                        </Link>
                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700 text-sm font-medium hover:underline"
                        >
                            Vider le panier
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96">
                    <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Résumé de la commande</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-600">
                                <span>Sous-total</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Livraison</span>
                                <span className="text-green-600 font-medium">Gratuite</span>
                            </div>
                            <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-2xl font-extrabold text-indigo-600">{cartTotal.toFixed(2)} €</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2 group"
                        >
                            Passer la commande
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="mt-6 flex items-center justify-around text-slate-400">
                            {/* Payment icons placeholders */}
                            <div className="w-10 h-6 bg-slate-100 rounded"></div>
                            <div className="w-10 h-6 bg-slate-100 rounded"></div>
                            <div className="w-10 h-6 bg-slate-100 rounded"></div>
                            <div className="w-10 h-6 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
