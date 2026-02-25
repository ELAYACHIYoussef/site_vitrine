import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
    const [currentImage, setCurrentImage] = React.useState(0);
    const heroImages = [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", // Watch
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", // Headset
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", // Shoes
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"  // Glasses
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const titleContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.5 }
        }
    };

    const titleItem = {
        hidden: { opacity: 0, y: 50, rotateX: 45 },
        show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="font-sans bg-white overflow-hidden min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#020617]">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-indigo-600/20 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/4"
                    ></motion.div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial="hidden" animate="show" variants={titleContainer}>
                        <motion.div variants={titleItem} className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-bold mb-10 backdrop-blur-xl">
                            ÉDITION ÉLITE 2026
                        </motion.div>
                        <motion.h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
                            <motion.span variants={titleItem} className="block uppercase">Équipez votre</motion.span>
                            <motion.span variants={titleItem} className="text-gradient-antigravity block italic uppercase">Maison.</motion.span>
                        </motion.h1>
                        <motion.p variants={titleItem} className="text-slate-400 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed">
                            Le raffinement technologique au service de votre intérieur. Une sélection d'élite pour un quotidien d'exception.
                        </motion.p>
                        <motion.div variants={titleItem} className="flex gap-6">
                            <Link to="/products" className="btn-primary group relative overflow-hidden px-10 py-5 bg-white text-black rounded-full font-black flex items-center gap-3 active:scale-95 transition-all">
                                <span>Explorer le Futur</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Slideshow Dynamique */}
                    <div className="relative h-[500px] md:h-[600px] hidden lg:block">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, scale: 0.8, x: 100, rotateY: 45 }}
                                animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.1, x: -100, rotateY: -45 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="relative w-full h-full max-w-md">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[3rem] blur-3xl transform rotate-6"></div>
                                    <img
                                        src={heroImages[currentImage]}
                                        alt="Product showcase"
                                        className="w-full h-full object-contain rounded-[3rem] shadow-2xl relative z-10"
                                    />
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 flex items-center justify-center z-20">
                                        <div className="text-white text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">SÉLECTION</p>
                                            <p className="font-black text-2xl">A++</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <span className="text-indigo-600 font-black text-sm tracking-[0.3em] uppercase block mb-4">La Sélection</span>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Incontournables</h2>
                        </div>
                        <Link to="/products" className="group flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-200 font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                            Tout Découvrir
                        </Link>
                    </div>
                    <ProductGrid limit={4} />
                </div>
            </section>
        </div>
    );
};

export default Home;
