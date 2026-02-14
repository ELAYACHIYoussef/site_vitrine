import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orderService';
import toast from 'react-hot-toast';
import { CheckCircle, MapPin, CreditCard, ShoppingBag, ArrowRight, Loader } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment/Confirm

    const [formData, setFormData] = useState({
        fullName: user?.username || '', // Pre-fill if able
        email: user?.email || '',
        address: '',
        city: '',
        zipCode: '',
        country: 'France'
    });

    if (cart.length === 0) {
        navigate('/cart');
        return null; // Redirect empty cart
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceedToPayment = () => {
        if (!formData.address || !formData.city || !formData.zipCode) {
            toast.error("Veuillez remplir tous les champs de livraison");
            return;
        }

        const orderData = {
            userId: user?.id || 999,
            customerName: formData.fullName,
            customerEmail: formData.email,
            shippingAddress: `${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`,
            items: cart.map(item => ({
                productId: item.id,
                productName: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.selectedSize,
                color: item.selectedColor
            }))
        };

        navigate('/payment', { state: { orderData } });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Validation de la commande</h1>

            <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                {/* Left: Steps & Form */}
                <div className="flex-1">
                    {/* Steps Indicator */}
                    <div className="flex items-center mb-10">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            1
                        </div>
                        <div className={`h-1 flex-1 mx-4 rounded ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            2
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                        {step === 1 ? (
                            <div className="animation-fade-in">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <MapPin className="text-indigo-600" />
                                    Adresse de livraison
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Nom complet</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                placeholder="Jean Dupont"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                placeholder="jean@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Adresse</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                            placeholder="123 rue de la Paix"
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Ville</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                placeholder="Paris"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Code Postal</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                                placeholder="75001"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Pays</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white"
                                            >
                                                <option value="France">France</option>
                                                <option value="Belgique">Belgique</option>
                                                <option value="Suisse">Suisse</option>
                                                <option value="Canada">Canada</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
                                    >
                                        Continuer vers le paiement
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="animation-fade-in">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <CreditCard className="text-indigo-600" />
                                    Paiement & Confirmation
                                </h2>

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
                                    <h3 className="font-semibold text-slate-800 mb-3">Récapitulatif Livraison</h3>
                                    <p className="text-slate-600">{formData.fullName}</p>
                                    <p className="text-slate-600">{formData.address}</p>
                                    <p className="text-slate-600">{formData.zipCode} {formData.city}, {formData.country}</p>
                                    <button onClick={() => setStep(1)} className="text-indigo-600 text-sm font-medium hover:underline mt-2">Modifier</button>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 border border-indigo-600 bg-indigo-50 rounded-xl flex items-center gap-4 cursor-pointer relative">
                                        <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="text-indigo-600" />
                                            <span className="font-semibold text-indigo-900">Carte Bancaire (Démo)</span>
                                        </div>
                                        <span className="absolute right-4 text-xs font-bold text-indigo-500 bg-white px-2 py-1 rounded">SIMULÉ</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-center">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-slate-500 hover:text-slate-800 font-medium"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        onClick={handleProceedToPayment}
                                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
                                    >
                                        Procéder au paiement <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Cart Summary Mini */}
                <div className="w-full lg:w-80">
                    <div className="bg-white rounded-2xl shadow border border-slate-100 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-indigo-500" />
                            Votre Panier ({cart.length})
                        </h3>
                        <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-start">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={getImageUrl(item.thumbnail)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800 line-clamp-2">{item.name}</p>
                                        <p className="text-xs text-slate-500 mt-1">Qté: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900">{(item.price * item.quantity).toFixed(2)} €</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 mt-6 pt-4 space-y-3">
                            <div className="flex justify-between text-slate-600 text-sm">
                                <span>Sous-total</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-slate-600 text-sm">
                                <span>Livraison</span>
                                <span className="text-green-600">Gratuite</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-slate-900 pt-2">
                                <span>Total</span>
                                <span>{cartTotal.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
