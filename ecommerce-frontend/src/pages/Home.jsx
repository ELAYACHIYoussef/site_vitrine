import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Server, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden hero-gradient">
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600 rounded-full blur-[150px] animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8 backdrop-blur-md shadow-lg">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            Nouvelle Collection 2026 Disponible
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tight drop-shadow-sm">
                            L'Art du <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300">Commerce.</span>
                        </h1>
                        <p className="text-indigo-100 text-lg md:text-2xl mb-10 max-w-xl leading-relaxed font-light">
                            Découvrez une expérience d'achat fluide, propulsée par une technologie de pointe et un design d'exception.
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/products" className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
                                Explorer le catalogue
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                                Nous contacter
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 group">
                            <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] overflow-hidden relative shadow-inner">
                                <img
                                    src="https://images.unsplash.com/photo-1600185365483-26d7a042b7f3?q=80&w=1000&auto=format&fit=crop"
                                    alt="Hero Product"
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white text-2xl font-bold">Nike Air Zoom</h3>
                                    <p className="text-indigo-300">Performance & Style</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Architecture & Technologies Section */}
            <section className="container mx-auto px-6 py-10">
                <div className="text-center mb-16">
                    <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase bg-indigo-50 px-3 py-1 rounded-full">Innovation</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 mb-4">Une Puissance Technologique</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg"> Notre plateforme repose sur une architecture moderne pour garantir rapidité et sécurité.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-indigo-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Server className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Microservices</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Architecture distribuée robuste (Spring Boot) assurant une disponibilité maximale et une évolutivité sans faille.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-rose-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Performance React</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Interface ultra-rapide et réactive offrant une expérience utilisateur fluide et instantanée.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-green-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Sécurité Avant Tout</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Authentification sécurisée et protection des données de bout en bout pour une confiance totale.
                        </p>
                    </div>
                </div>
            </section>

            {/* Advantages Grid */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">Pourquoi choisir <br /><span className="text-indigo-400">VITRINE.IO ?</span></h2>
                            <ul className="space-y-6">
                                {[
                                    "Catalogue produits mis à jour en temps réel",
                                    "Suivi de commande détaillé étape par étape",
                                    "Support client réactif et personnalisé",
                                    "Expérience mobile optimale"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-lg text-slate-300">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10">
                                <Link to="/register" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-white transition-colors shadow-lg shadow-indigo-600/30">
                                    Rejoindre la communauté
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4 translate-y-8">
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                        <Globe className="w-10 h-10 text-indigo-400 mb-4" />
                                        <h4 className="font-bold text-xl mb-2">Global</h4>
                                        <p className="text-slate-400 text-sm">Livraison partout dans le monde</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                        <Zap className="w-10 h-10 text-yellow-400 mb-4" />
                                        <h4 className="font-bold text-xl mb-2">Rapide</h4>
                                        <p className="text-slate-400 text-sm">Expédition en 24/48h</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                        <ShieldCheck className="w-10 h-10 text-green-400 mb-4" />
                                        <h4 className="font-bold text-xl mb-2">Sécurisé</h4>
                                        <p className="text-slate-400 text-sm">Paiements cryptés</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                        <Server className="w-10 h-10 text-rose-400 mb-4" />
                                        <h4 className="font-bold text-xl mb-2">Fiable</h4>
                                        <p className="text-slate-400 text-sm">99.9% Uptime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="collection" className="container mx-auto px-6 pt-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase bg-indigo-50 px-3 py-1 rounded-full">Collection Exclusive</span>
                        <h2 className="text-4xl font-extrabold text-slate-900 mt-4">Nos Meilleurs Produits</h2>
                    </div>
                    <Link to="/products" className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors">
                        Voir tout le catalogue
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                <div className="p-1">
                    <ProductGrid />
                </div>
            </section>
        </div>
    );
};

export default Home;
