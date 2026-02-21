import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, HeadphonesIcon, ArrowRight, Star, Smartphone, Laptop, Watch, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '../hooks/animations';

const Home = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
                {/* Background Gradient & Shapes */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={fadeInLeft}
                        initial="initial"
                        animate="animate"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                            Nouvelle Collection Hiver 2026
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                            L'Élégance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">Technologique.</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                            Découvrez une sélection exclusive de produits high-tech et lifestyle. Qualité premium, design innovant et performance inégalée.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/products" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 group">
                                Acheter Maintenant
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/products?category=promo" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
                                Voir les Promos
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-indigo-400" /> Livraison Gratuite
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-indigo-400" /> Garantie 2 Ans
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Hero Image */}
                        <div className="relative z-10 w-full aspect-square max-w-3xl mx-auto">
                            <div className="absolute inset-4 bg-gradient-to-tr from-indigo-500/20 to-rose-500/20 rounded-[3rem] blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop"
                                alt="Modern Tech Lifestyle"
                                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white/10 relative z-20 animate-float"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-8 z-30 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Star className="w-6 h-6 fill-current" />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-xl">4.9/5</p>
                                    <p className="text-slate-500 text-sm">Avis Clients</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Explorez par Catégorie</h2>
                        <p className="text-slate-500 mt-2">Trouvez exactement ce que vous cherchez</p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { name: 'Smartphones', icon: Smartphone, color: 'bg-blue-100 text-blue-600', link: '/products?category=smartphones' },
                            { name: 'Ordinateurs', icon: Laptop, color: 'bg-purple-100 text-purple-600', link: '/products?category=laptops' },
                            { name: 'Montres', icon: Watch, color: 'bg-rose-100 text-rose-600', link: '/products?category=smartwatches' },
                            { name: 'Accessoires', icon: HeadphonesIcon, color: 'bg-amber-100 text-amber-600', link: '/products?category=accessories' },
                        ].map((cat, i) => (
                            <motion.div variants={staggerItem} key={i}>
                                <Link to={cat.link} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 group text-center h-full">
                                    <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <cat.icon size={32} />
                                    </div>
                                    <h3 className="font-bold text-slate-800">{cat.name}</h3>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-indigo-600 font-bold text-sm tracking-wider uppercase">Tendance</span>
                            <h2 className="text-3xl font-bold text-slate-900 mt-2">Les Mieux Notés</h2>
                        </div>
                        <Link to="/products" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group">
                            Voir tout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <ProductGrid limit={4} />
                </div>
            </section>

            {/* Benefits Banner */}
            <section className="bg-slate-900 py-16 text-white overflow-hidden">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="container mx-auto px-6 relative z-10"
                >
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <motion.div variants={fadeInUp} className="p-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                                <Truck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Livraison Express</h3>
                            <p className="text-slate-400">Expédition le jour même pour toute commande avant 14h.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="p-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Paiement Sécurisé</h3>
                            <p className="text-slate-400">Transactions 100% sécurisées via Stripe et PayPal.</p>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="p-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                                <HeadphonesIcon size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Support 24/7</h3>
                            <p className="text-slate-400">Une équipe dédiée pour répondre à toutes vos questions.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Newsletter */}
            <section className="py-20 bg-indigo-50 border-t border-indigo-100">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="container mx-auto px-6 text-center max-w-3xl"
                >
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
                        <ShoppingBag size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Ne ratez aucune offre !</h2>
                    <p className="text-slate-600 mb-8 text-lg">Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et des codes promo exclusifs.</p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            className="flex-1 px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                            required
                        />
                        <button type="submit" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 animate-pulse-glow">
                            S'inscrire
                        </button>
                    </form>
                    <p className="text-xs text-slate-400 mt-4">Nous ne spammerons jamais votre boîte mail. Promis.</p>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
