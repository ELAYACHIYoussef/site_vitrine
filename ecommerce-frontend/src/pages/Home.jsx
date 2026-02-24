import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, HeadphonesIcon, ArrowRight, Star, Smartphone, Laptop, Watch, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '../hooks/animations';

const Home = () => {
    return (
        <div className="font-sans bg-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#020617]">
                {/* Background Components */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2],
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/30 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"
                    ></motion.div>
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.15, 0.1],
                            x: [0, -40, 0],
                            y: [0, 40, 0]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-600/15 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"
                    ></motion.div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-125 contrast-150 mix-blend-overlay"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-bold mb-10 backdrop-blur-xl"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            ÉDITION LIMITÉE 2026
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-[1000] text-white leading-[0.95] mb-8 tracking-tighter">
                            VIVEZ LE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">FUTUR.</span>
                        </h1>
                        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed font-medium">
                            Une fusion parfaite entre artisanat de luxe et innovation technologique. Redéfinissez vos standards dès maintenant.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <Link to="/products" className="btn-primary group">
                                Explorer la Collection
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link to="/products?category=promo" className="btn-secondary group">
                                Offres Spéciales
                            </Link>
                        </div>

                        <div className="mt-16 flex items-center gap-12 text-slate-500 text-sm font-bold tracking-widest uppercase">
                            <motion.div whileHover={{ y: -5 }} className="flex items-center gap-3 cursor-default">
                                <Truck className="w-6 h-6 text-indigo-500" /> Livraison VIP
                            </motion.div>
                            <motion.div whileHover={{ y: -5 }} className="flex items-center gap-3 cursor-default">
                                <ShieldCheck className="w-6 h-6 text-rose-500" /> Assurance Totale
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="relative hidden lg:block perspective-1000"
                    >
                        {/* Main Hero Image with Floating Effect */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 w-full aspect-[4/5] max-w-2xl ml-auto"
                        >
                            <div className="absolute inset-8 bg-indigo-600/30 rounded-[4rem] blur-[80px]"></div>
                            <img
                                src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1200&auto=format&fit=crop"
                                alt="Modern Tech Lifestyle"
                                className="w-full h-full object-cover rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10 relative z-20"
                            />

                            {/* Floating UI Elements */}
                            <motion.div
                                animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 z-30 bg-white/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 flex items-center gap-6"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                                    <Star className="w-8 h-8 fill-current" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-[900] text-3xl">4.9</p>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Note Moyenne</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-20 -right-12 z-30 bg-slate-900/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/10"
                            >
                                <div className="flex -space-x-3 mb-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                                        +5k
                                    </div>
                                </div>
                                <p className="text-white text-xs font-bold uppercase tracking-widest">+5000 Clients Heureux</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Category Grid */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">L'Univers AzyMarket</h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Explorez nos collections soigneusement séléctionnées pour les amateurs de perfection.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Smartphones', icon: Smartphone, color: 'from-blue-500 to-indigo-600', link: '/products?category=smartphones' },
                            { name: 'Ordinateurs', icon: Laptop, color: 'from-purple-500 to-fuchsia-600', link: '/products?category=laptops' },
                            { name: 'Montres', icon: Watch, color: 'from-rose-500 to-pink-600', link: '/products?category=smartwatches' },
                            { name: 'Accessoires', icon: HeadphonesIcon, color: 'from-amber-400 to-orange-500', link: '/products?category=accessories' },
                        ].map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={cat.link} className="premium-card p-10 group text-center block h-full">
                                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        <cat.icon size={48} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{cat.name}</h3>
                                    <p className="text-slate-400 mt-3 text-sm font-bold underline underline-offset-4 decoration-slate-200 group-hover:decoration-indigo-300 transition-all">VOIR TOUT</p>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
                        <div>
                            <span className="text-indigo-600 font-black text-sm tracking-[0.3em] ml-1 uppercase block mb-4">Les Incontournables</span>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Best Sellers du Moment</h2>
                        </div>
                        <Link to="/products" className="group flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-200 font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                            Tout Découvrir
                            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                    <ProductGrid limit={4} />
                </div>
            </section>

            {/* Benefits - Premium Minimalist Layout */}
            <section className="bg-[#020617] py-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-3 gap-24">
                        {[
                            { icon: Truck, title: 'Conciergerie Logistique', desc: 'Livraison express ultra-sécurisée partout dans le pays sous 24h.' },
                            { icon: ShieldCheck, title: 'Sérénité Garantie', desc: 'Une protection premium de 24 mois sur l\'intégralité de notre catalogue.' },
                            { icon: HeadphonesIcon, title: 'Engagement Elite', desc: 'Un support technique d\'excellence disponible 24h/24 et 7j/7.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-2xl">
                                    <item.icon size={36} />
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{item.title}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Luxury Newsletter */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 text-indigo-600 rotate-12">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter">LE CERCLE PRIVÉ.</h2>
                    <p className="text-slate-500 mb-16 text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                        Inscrivez-vous pour accéder à nos ventes privées et avant-premières exclusives dès maintenant.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="VOTRE ADRESSE ELITE"
                            className="flex-1 px-10 py-6 rounded-[2rem] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 transition-all font-bold text-lg"
                            required
                        />
                        <button type="submit" className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-slate-800 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] active:scale-95 uppercase tracking-widest leading-none">
                            REJOINDRE
                        </button>
                    </form>
                    <p className="text-xs text-slate-400 mt-10 font-bold tracking-[0.2em] uppercase">Vôtre vie privée est nôtre priorité absolue.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
