import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Heart, ShoppingBag, Eye, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/imageUtils';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(product.id);

    // Fix image path logic
    // Using utility function imported


    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="premium-card group"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                {/* Image with subtle zoom on hover */}
                <img
                    src={getImageUrl(product.thumbnail)}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/products/product_1.jpg'; }}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />

                {/* Badges - Premium Style */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {product.new && (
                        <span className="bg-[#020617] text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-xl uppercase">
                            Nouveau
                        </span>
                    )}
                    {product.promo && (
                        <span className="bg-rose-600 text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-xl uppercase">
                            -20%
                        </span>
                    )}
                </div>

                {product.videoUrl && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md text-indigo-600 p-2.5 rounded-2xl shadow-xl"
                    >
                        <Video className="w-4 h-4" />
                    </motion.div>
                )}

                {/* Premium Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-[2rem] flex items-center justify-between gap-2 shadow-2xl">
                        <button
                            onClick={() => toggleWishlist(product, user?.id)}
                            className={`flex-1 flex items-center justify-center p-4 rounded-full transition-all duration-300 ${isLoved ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isLoved ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 flex items-center justify-center p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/40"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </button>
                        <Link to={`/products/${product.id}`} className="flex-1">
                            <div className="flex items-center justify-center p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300">
                                <Eye className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {product.categoryLabel || 'Excellence'}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star size={12} className="fill-current" />
                        <span className="text-[11px] font-black text-slate-900 leading-none">4.9</span>
                    </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium leading-relaxed h-10">
                    {product.descriptionCourte || "L'excellence du futur, disponible dès aujourd'hui dans vôtre collection."}
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Prix Excellence</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">{product.price} €</span>
                    </div>
                    <Link to={`/products/${product.id}`} className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 group-hover:rotate-45">
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
