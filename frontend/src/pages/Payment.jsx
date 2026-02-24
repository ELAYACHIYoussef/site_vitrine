import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderService';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { CreditCard, Lock, CheckCircle, Loader, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart, cartTotal } = useCart();
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Get order data passed from Checkout
    const orderData = location.state?.orderData;

    useEffect(() => {
        if (!orderData) {
            toast.error("Aucune commande trouvée");
            navigate('/cart');
        }
    }, [orderData, navigate]);

    if (!orderData) return null;

    const handlePayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment delay
        setTimeout(async () => {
            try {
                // Call backend to create order
                await createOrder(orderData);
                clearCart();
                toast.success("Paiement accepté ! Commande validée.");
                navigate('/account/orders');
            } catch (error) {
                console.error("Order error", error);
                toast.error("Erreur lors du traitement de la commande");
                setProcessing(false);
            }
        }, 2000); // 2 second delay for realism
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">

                {/* Left: Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ShoppingBagIcon className="w-5 h-5 text-indigo-600" />
                            Récapitulatif
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-600">
                                <span>Sous-total</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Livraison</span>
                                <span className="text-green-600 font-medium">Offerte</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="font-bold text-slate-900">Total à payer</span>
                                <span className="text-2xl font-extrabold text-indigo-600">{cartTotal.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h3 className="text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            Paiement Sécurisé
                        </h3>
                        <p className="text-indigo-700 text-sm">
                            Vos informations bancaires sont chiffrées (SSL). Nous ne stockons aucune donnée sensible.
                            Ceci est une simulation de paiement.
                        </p>
                    </div>
                </div>

                {/* Right: Payment Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 relative">
                    {processing && (
                        <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                            <h3 className="text-xl font-bold text-slate-800">Traitement en cours...</h3>
                            <p className="text-slate-500">Ne fermez pas cette page</p>
                        </div>
                    )}

                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-slate-900 mb-6">Paiement</h1>

                        {/* Methods */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all ${paymentMethod === 'card'
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5" />
                                Carte
                            </button>
                            <button
                                onClick={() => setPaymentMethod('paypal')}
                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all ${paymentMethod === 'paypal'
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                                    }`}
                            >
                                <span className="font-bold italic">PayPal</span>
                            </button>
                        </div>

                        {paymentMethod === 'card' ? (
                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Nom sur la carte</label>
                                    <input
                                        type="text"
                                        defaultValue={orderData.customerName}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        placeholder="Jean Dupont"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Numéro de carte</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all letter-spacing-wide"
                                            maxLength="19"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Expiration</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                            maxLength="5"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">CVC</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-6"
                                >
                                    Payer {cartTotal.toFixed(2)} €
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-10 space-y-4">
                                <p className="text-slate-600">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                                <button
                                    onClick={handlePayment}
                                    className="w-full bg-[#0070ba] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#003087] shadow-lg transition-all"
                                >
                                    Payer avec PayPal
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Icon component helper if needed, or import from lucide-react
const ShoppingBagIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2001/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);

export default Payment;
