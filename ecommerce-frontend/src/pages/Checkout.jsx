import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../api/orderService';
import toast from 'react-hot-toast';
import { CheckCircle, MapPin, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../hooks/animations';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery, 3: Payment/Confirm

    const [formData, setFormData] = useState({
        fullName: user?.username || '',
        email: user?.email || '',
        address: '',
        deliveryMethod: 'carrier', // 'carrier' or 'hand'
        city: '',
        zipCode: '',
        country: 'France'
    });

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/cart');
        }
    }, [cart, navigate]);

    if (cart.length === 0) {
        return null;
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
            shippingAddress: `[${formData.deliveryMethod === 'hand' ? 'MAIN PROPRE' : 'LIVRAISON'}] ${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`,
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

    // Debug View
    console.log("Checkout Render: ", { cart, user, step, formData });

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
                className="text-4xl font-black text-slate-900 mb-12 text-center"
            >
                Finaliser l'achat
            </motion.h1>

            <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                {/* Left: Steps & Form */}
                <div className="flex-1">
                    {/* Steps Indicator */}
                    <div className="flex items-center mb-12 px-4">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <motion.div
                                    animate={{
                                        scale: step === s ? 1.1 : 1,
                                        backgroundColor: step >= s ? '#4f46e5' : '#f1f5f9',
                                        color: step >= s ? '#ffffff' : '#94a3b8'
                                    }}
                                    className="flex items-center justify-center w-12 h-12 rounded-2xl font-black shadow-sm transition-colors border-2 border-transparent"
                                >
                                    {step > s ? <CheckCircle size={20} /> : s}
                                </motion.div>
                                {s < 3 && (
                                    <div className="h-1.5 flex-1 mx-4 rounded-full bg-slate-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: step > s ? '100%' : '0%' }}
                                            className="h-full bg-indigo-600"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-100 border border-slate-100 p-8 min-h-[500px] flex flex-col">
                        <AnimatePresence mode='wait'>
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex-1"
                                >
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                            <MapPin size={24} />
                                        </div>
                                        Adresse de livraison
                                    </h2>
                                    <motion.div
                                        variants={staggerContainer}
                                        initial="initial"
                                        animate="animate"
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div variants={staggerItem} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom complet</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                    placeholder="Jean Dupont"
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                    placeholder="jean@example.com"
                                                />
                                            </motion.div>
                                        </div>
                                        <motion.div variants={staggerItem} className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Adresse complète</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                placeholder="123 rue de la Paix"
                                            />
                                        </motion.div>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            <motion.div variants={staggerItem} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Ville</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                    placeholder="Paris"
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Code Postal</label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                    placeholder="75001"
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem} className="space-y-2 lg:col-span-1 col-span-2">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Pays</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 focus:border-indigo-600 focus:bg-white bg-slate-50 outline-none transition-all font-medium"
                                                >
                                                    <option value="France">France</option>
                                                    <option value="Belgique">Belgique</option>
                                                    <option value="Suisse">Suisse</option>
                                                    <option value="Canada">Canada</option>
                                                </select>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                    <div className="mt-12 flex justify-end">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setStep(2)}
                                            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center gap-2"
                                        >
                                            Suivant <ArrowRight size={20} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ) : step === 2 ? (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex-1"
                                >
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                            <span>🚚</span>
                                        </div>
                                        Mode de Livraison
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { id: 'carrier', title: 'Livraison Standard', desc: 'Livré sous 3-5 jours', price: 'Gratuit', icon: '📦' },
                                            { id: 'hand', title: 'Main Propre', desc: 'Point de retrait Azy', price: 'Gratuit', icon: '🤝' }
                                        ].map((m) => (
                                            <motion.div
                                                key={m.id}
                                                whileHover={{ y: -5 }}
                                                onClick={() => setFormData({ ...formData, deliveryMethod: m.id })}
                                                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col gap-4 relative overflow-hidden ${formData.deliveryMethod === m.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-50 bg-slate-50/30 hover:border-indigo-200'}`}
                                            >
                                                {formData.deliveryMethod === m.id && (
                                                    <motion.div layoutId="active-bg" className="absolute inset-0 bg-indigo-50 z-0" />
                                                )}
                                                <div className="relative z-10 flex justify-between items-start">
                                                    <div className="text-3xl">{m.icon}</div>
                                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.deliveryMethod === m.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                                                        {formData.deliveryMethod === m.id && <CheckCircle size={14} className="text-white" />}
                                                    </div>
                                                </div>
                                                <div className="relative z-10">
                                                    <h3 className="font-black text-slate-900 text-lg">{m.title}</h3>
                                                    <p className="text-slate-500 text-sm font-medium">{m.desc}</p>
                                                </div>
                                                <div className="relative z-10 mt-2 font-black text-emerald-600">{m.price}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-12 flex justify-between items-center">
                                        <button onClick={() => setStep(1)} className="text-slate-400 hover:text-indigo-600 font-bold transition-colors">Retour</button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setStep(3)}
                                            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center gap-2"
                                        >
                                            Suivant <ArrowRight size={20} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex-1"
                                >
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                            <CreditCard size={24} />
                                        </div>
                                        Vérification finale
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-4">
                                            <div>
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Destinataire</h3>
                                                <p className="text-slate-900 font-black">{formData.fullName}</p>
                                                <p className="text-slate-600 text-sm font-medium">{formData.email}</p>
                                            </div>
                                            <div className="pt-4 border-t border-slate-200/50">
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Adresse</h3>
                                                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                                    {formData.address}<br />
                                                    {formData.zipCode} {formData.city}, {formData.country}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Expédition</h3>
                                            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                                                <div className="text-2xl">{formData.deliveryMethod === 'carrier' ? '🚚' : '🤝'}</div>
                                                <div>
                                                    <p className="text-indigo-600 font-black">
                                                        {formData.deliveryMethod === 'carrier' ? 'Livraison Standard' : 'Remise en Main Propre'}
                                                    </p>
                                                    <p className="text-slate-400 text-xs font-bold uppercase">Gratuit</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setStep(1)} className="text-indigo-600 text-xs font-black uppercase tracking-tighter hover:underline mt-4 block text-center w-full">Modifier les infos</button>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="text-slate-400 hover:text-indigo-600 font-bold transition-colors"
                                        >
                                            Retour
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleProceedToPayment}
                                            className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 flex items-center gap-3 animate-pulse-glow"
                                        >
                                            Confirmer et Payer <ArrowRight size={22} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Cart Summary Mini */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-80"
                >
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 sticky top-24 overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 -z-10 opacity-50"></div>
                        <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-indigo-500" />
                            Commande
                        </h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <motion.div variants={staggerItem} key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-start group">
                                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 group-hover:scale-105 transition-transform duration-300">
                                        <img src={getImageUrl(item.thumbnail)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">{item.name}</p>
                                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">Qté: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-black text-slate-900">{(item.price * item.quantity).toFixed(2)} €</p>
                                </motion.div>
                            ))}
                        </div>
                        <div className="border-t border-slate-100 mt-8 pt-6 space-y-4">
                            <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                                <span>Sous-total</span>
                                <span className="text-slate-900">{cartTotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
                                <span>Livraison</span>
                                <span className="text-emerald-500">Gratuite</span>
                            </div>
                            <div className="flex justify-between font-black text-xl text-slate-900 pt-4 border-t border-slate-50 border-dashed">
                                <span className="text-indigo-600">Total</span>
                                <span className="text-2xl">{cartTotal.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Checkout;
