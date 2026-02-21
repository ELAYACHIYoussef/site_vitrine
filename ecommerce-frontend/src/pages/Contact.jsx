import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../hooks/animations';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulation d'envoi
        setTimeout(() => {
            setLoading(false);
            toast.success("Votre message a bien été envoyé ! Nous vous répondrons sous 24h.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="bg-white min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Contactez<span className="text-indigo-600">Nous</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Une question sur un produit ? Une commande ? Notre équipe d'experts est là pour vous aider du lundi au vendredi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Info Card */}
                    <motion.div variants={fadeInUp} className="local-area lg:col-span-1 space-y-8">
                        <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 h-full">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-xl">
                                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                                </div>
                                Informations
                            </h3>

                            <div className="space-y-8">
                                {[
                                    { icon: Mail, title: 'Email', value: 'support@vitrine.io', sub: 'Réponse sous 24h' },
                                    { icon: Phone, title: 'Téléphone', value: '+33 1 23 45 67 89', sub: 'Lun-Ven, 9h-18h' },
                                    { icon: MapPin, title: 'Adresse', value: '123 Avenue de l’Innovation, 75000 Paris', sub: 'Siège social' }
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest opacity-40 mb-1">{item.title}</h4>
                                            <p className="text-slate-900 font-bold">{item.value}</p>
                                            <p className="text-slate-400 text-sm mt-0.5 font-medium">{item.sub}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-indigo-100/50 border border-slate-50">
                            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Envoyez-nous un message</h2>

                            <motion.form
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <motion.div variants={staggerItem} className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest opacity-40 ml-1">Nom complet</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        />
                                    </motion.div>
                                    <motion.div variants={staggerItem} className="space-y-2">
                                        <label className="text-sm font-black text-slate-700 uppercase tracking-widest opacity-40 ml-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div variants={staggerItem} className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest opacity-40 ml-1">Sujet</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all cursor-pointer font-medium appearance-none"
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="order">Question sur une commande</option>
                                        <option value="product">Information produit</option>
                                        <option value="return">Retours & Remboursements</option>
                                        <option value="other">Autre demande</option>
                                    </select>
                                </motion.div>

                                <motion.div variants={staggerItem} className="space-y-2">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest opacity-40 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none font-medium"
                                    ></textarea>
                                </motion.div>

                                <motion.button
                                    variants={staggerItem}
                                    whileHover={{ scale: 1.01, backgroundColor: '#4338ca' }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`
                                        w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 
                                        transition-all flex items-center justify-center gap-3
                                        ${loading ? 'opacity-70 cursor-wait' : ''}
                                    `}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Envoi en cours...
                                        </span>
                                    ) : (
                                        <>
                                            Envoyer le message
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
