import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils/imageUtils';
import { fadeInUp, staggerItem } from '../hooks/animations';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(product.id);

    // Fix image path logic
    // Using utility function imported


    return (
        <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                    src={getImageUrl(product.thumbnail)}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/products/product_1.jpg'; }}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <motion.button
                        variants={staggerItem}
                        onClick={() => toggleWishlist(product, user?.id)}
                        className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 active:scale-90 ${isLoved ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 hover:bg-rose-500 hover:text-white'
                            }`}
                        title={isLoved ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                        <Heart className={`w-5 h-5 ${isLoved ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                        variants={staggerItem}
                        onClick={() => addToCart(product)}
                        className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                        title="Ajouter au panier"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                    <motion.div variants={staggerItem}>
                        <Link to={`/products/${product.id}`} className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all block transform hover:scale-110 active:scale-90" title="Voir détails">
                            <Eye className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>

                {/* Badges/Tags if needed */}
                {product.new && (
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg animate-shimmer">
                        NOUVEAU
                    </span>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                        {product.categoryLabel || 'Collection'}
                    </span>
                    <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(5)}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10 leading-relaxed">
                    {product.descriptionCourte || "Un design d'exception pour un confort inégalé."}
                </p>

                <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">Prix</span>
                        <span className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.price} €</span>
                    </div>
                    <Link to={`/products/${product.id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 group/btn">
                        Voir le produit
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
