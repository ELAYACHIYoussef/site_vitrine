import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden hero-gradient">
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500 rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
                            Nouvelle Collection 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                            L'Élégance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Redéfinie.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light">
                            Une sélection exclusive de produits conçus pour ceux qui refusent les compromis entre style et performance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="btn-primary">
                                Explorer la Collection
                            </button>
                            <button className="btn-secondary">
                                Notre Histoire
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image / Abstract Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden md:block"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer group">
                            <div className="aspect-[4/5] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                        <p className="text-white font-bold text-lg">Nike Air Max 270</p>
                                        <p className="text-indigo-300 text-sm">Édition Limitée</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                </motion.div>
            </section>

            {/* Features / Benefits */}
            <section className="container mx-auto px-6 grid md:grid-cols-3 gap-8 -mt-20 relative z-20">
                {[
                    { title: "Livraison Premium", text: "Expédition sécurisée en 24h", icon: "🚀" },
                    { title: "Garantie à Vie", text: "Qualité certifiée et durable", icon: "💎" },
                    { title: "Support 24/7", text: "Une équipe dédiée pour vous", icon: "🎧" }
                ].map((item, index) => (
                    <div key={index} className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-1 transition-all duration-300">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500">{item.text}</p>
                    </div>
                ))}
            </section>

            {/* Products Section */}
            <section id="collection" className="container mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Collection Exclusive</span>
                        <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Nos Meilleurs Produits</h2>
                    </div>
                    <button className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition-colors">
                        Voir tout le catalogue
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="p-1"> {/* Padding for shadow breathing room */}
                    <ProductGrid />
                </div>
            </section>
        </div>
    );
};

export default Home;
