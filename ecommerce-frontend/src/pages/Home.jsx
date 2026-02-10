import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden bg-secondary rounded-3xl m-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-3xl"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                        Design Premium.<br /><span className="text-primary">E-commerce Pur.</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Découvrez notre collection exclusive de produits sélectionnés pour leur qualité et leur design exceptionnel.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/30 transition-all">
                            Explorer la Collection
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg border border-white/20 transition-all">
                            En savoir plus
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Products Section */}
            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-2">Nos Meilleurs Produits</h2>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>
                    <button className="text-primary font-bold hover:underline">Voir tout →</button>
                </div>

                <ProductGrid />
            </section>
        </div>
    );
};

export default Home;
