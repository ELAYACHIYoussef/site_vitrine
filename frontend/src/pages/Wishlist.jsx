import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../hooks/animations';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="container mx-auto px-4"
            >
                <motion.div variants={fadeInUp} className="text-center mb-12">
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3 tracking-tight"
                    >
                        <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                        Mes Favoris
                    </motion.h1>
                    <p className="text-slate-500 font-medium">
                        {wishlist.length} article{wishlist.length > 1 ? 's' : ''} dans votre liste de souhaits
                    </p>
                </motion.div>

                {wishlist.length === 0 ? (
                    <motion.div
                        variants={scaleIn}
                        className="text-center py-20 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-2xl mx-auto"
                    >
                        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-300">
                            <Heart className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Votre liste est vide</h2>
                        <p className="text-slate-500 mb-8 font-medium">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Découvrir nos produits
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {wishlist.map(product => (
                                <motion.div
                                    layout
                                    variants={staggerItem}
                                    key={product.id}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Wishlist;
