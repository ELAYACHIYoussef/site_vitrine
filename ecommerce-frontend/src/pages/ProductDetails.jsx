import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { catalogService } from '../api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Check, Truck, Shield, Package } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerItem } from '../hooks/animations';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Hooks
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [activeImage, setActiveImage] = useState(null);

    // Variant state
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await catalogService.getProduct(id);
                setProduct(response.data);
                if (response.data) {
                    await catalogService.incrementView(id);
                    if (response.data.sizes && response.data.sizes.length > 0) setSelectedSize(response.data.sizes[0]);
                    if (response.data.colors && response.data.colors.length > 0) setSelectedColor(response.data.colors[0]);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) {
            setActiveImage(product.thumbnail);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (product) {
            const cartItem = {
                ...product,
                selectedSize,
                selectedColor,
                quantity
            };
            addToCart(cartItem);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Produit introuvable</h2>
                <Link to="/" className="text-indigo-600 hover:underline">Retour à l'accueil</Link>
            </div>
        );
    }

    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
    const colors = product.colors && product.colors.length > 0 ? product.colors : ['Noir', 'Bleu', 'Gris'];
    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    const discount = 20;
    const originalPrice = (product.price * 1.25).toFixed(2);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb & Navigation */}
            <div className="bg-slate-50 border-b border-slate-200">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="container mx-auto px-4 py-3 text-sm text-slate-500"
                >
                    <Link to="/" className="hover:text-indigo-600">Accueil</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-900 font-medium truncate">{product.name}</span>
                </motion.div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Thumbnails (Desktop) */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="initial"
                        animate="animate"
                        className="hidden lg:block lg:col-span-1"
                    >
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setActiveImage(product.thumbnail)}
                                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImage === product.thumbnail
                                    ? 'border-indigo-500 shadow-md scale-105'
                                    : 'border-slate-200 hover:border-indigo-300'}`}
                            >
                                <img src={getImageUrl(product.thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImage === img
                                        ? 'border-indigo-500 shadow-md scale-105'
                                        : 'border-slate-200 hover:border-indigo-300'}`}
                                >
                                    <img src={getImageUrl(img)} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* CENTER COLUMN: Main Image */}
                    <div className="lg:col-span-11 xl:col-span-5 relative">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeImage || 'default'}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="aspect-[4/5] lg:aspect-square bg-white rounded-2xl overflow-hidden sticky top-8 flex items-center justify-center p-4 shadow-sm border border-slate-100"
                            >
                                <img
                                    src={getImageUrl(activeImage || product.thumbnail)}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110"
                                />

                                {/* Mobile Thumbnails Overlay */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden px-4 overflow-x-auto pb-2">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`w-12 h-12 flex-shrink-0 rounded-lg bg-white border-2 shadow-sm ${activeImage === img ? 'border-indigo-500' : 'border-slate-200'}`}
                                        >
                                            <img src={getImageUrl(img)} className="w-full h-full object-cover rounded-md" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Product Info & Buy Box */}
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="lg:col-span-12 xl:col-span-6 space-y-6"
                    >
                        {/* Title & Ratings */}
                        <motion.div variants={staggerItem} className="border-b border-slate-100 pb-4">
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 group cursor-pointer w-fit">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                                <span className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors">
                                    4.2 (420 avis)
                                </span>
                            </div>
                        </motion.div>

                        {/* Price Block */}
                        <motion.div variants={staggerItem} className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-3">
                                <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-{discount}% Off</span>
                                <span className="text-4xl font-black text-slate-900">
                                    {product.price} <span className="text-xl align-top text-indigo-600">€</span>
                                </span>
                            </div>
                            <div className="text-slate-400 text-sm flex items-center gap-2">
                                Prix conseillé : <span className="line-through">{originalPrice} €</span>
                                <span className="text-emerald-600 font-medium">Économisez {(originalPrice - product.price).toFixed(2)} €</span>
                            </div>
                        </motion.div>

                        {/* Description Short */}
                        <motion.div variants={staggerItem} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                            <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                À propos de cet article
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {product.descriptionCourte || "Un produit d'exception alliant qualité et performance pour sublimer votre quotidien."}
                            </p>
                        </motion.div>

                        {/* Variants Selection */}
                        <motion.div variants={staggerItem} className="space-y-6 pt-4">
                            {(() => {
                                const getVariantLabels = (cat) => {
                                    if (!cat) return { size: 'Taille', color: 'Couleur' };
                                    const c = cat.toLowerCase();
                                    if (c.includes('chaussure') || c.includes('shoes')) return { size: 'Pointure', color: 'Couleur' };
                                    if (c.includes('tech') || c.includes('phone')) return { size: 'Capacité', color: 'Couleur' };
                                    if (c.includes('maison')) return { size: 'Dimensions', color: 'Couleur' };
                                    return { size: 'Taille', color: 'Couleur' };
                                };
                                const labels = getVariantLabels(product.category || product.categoryLabel);

                                return (
                                    <>
                                        <div>
                                            <div className="flex justify-between mb-3">
                                                <span className="text-sm font-bold text-slate-700">{labels.size}: <span className="font-normal text-indigo-600 font-bold">{selectedSize || 'Sélectionner'}</span></span>
                                                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-tight underline">Guide</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`min-w-[50px] px-4 py-2.5 text-sm border-2 rounded-xl transition-all ${selectedSize === size
                                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-md'
                                                            : 'border-slate-100 bg-white hover:border-indigo-200 text-slate-600'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-sm font-bold text-slate-700 block mb-3">{labels.color}: <span className="font-normal text-indigo-600 font-bold">{selectedColor || 'Sélectionner'}</span></span>
                                            <div className="flex flex-wrap gap-3">
                                                {colors.map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`px-5 py-2 text-sm border-2 rounded-full transition-all ${selectedColor === color
                                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-md'
                                                            : 'border-slate-100 bg-white hover:border-indigo-200'
                                                            }`}
                                                    >
                                                        {color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>

                        {/* BUY BOX */}
                        <motion.div
                            variants={staggerItem}
                            className="border border-slate-200 rounded-3xl p-8 bg-white shadow-xl shadow-slate-100 mt-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-emerald-600 font-bold text-lg">
                                        <Check className="w-5 h-5 mr-2" />
                                        En stock
                                    </div>
                                    <div className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500 uppercase">AzyMarket Express</div>
                                </div>

                                <div className="text-sm bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-900">
                                    <span className="font-medium">Livraison GRATUITE </span> prévue le
                                    <span className="font-black ml-1">
                                        {deliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs py-1 text-slate-500 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Shield className="w-4 h-4 text-emerald-500" />
                                        Garantie 2 ans
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Truck className="w-4 h-4 text-indigo-500" />
                                        Expédié par Vitrine.io
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-bold text-slate-700">Quantité :</label>
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="border-2 border-slate-100 rounded-xl py-2 px-3 text-sm bg-slate-50 hover:bg-white focus:border-indigo-500 transition-all outline-none font-bold"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 gap-3 pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all animate-pulse-glow"
                                    >
                                        Ajouter au panier
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                                    >
                                        Acheter maintenant
                                    </motion.button>
                                </div>

                                <div className="pt-4 flex justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleWishlist(product, user?.id)}
                                        className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-full ${isInWishlist(product.id) ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                        {isInWishlist(product.id) ? 'Dans mes favoris' : 'Ajouter aux favoris'}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Technical Details Section */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="mt-20 pt-16 border-t border-slate-100"
                >
                    <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                        Description détaillée
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                            {product.description || product.descriptionLongue || "Ce produit a été conçu avec les meilleurs matériaux pour garantir une durabilité exceptionnelle et une expérience utilisateur inégalée. Chaque détail a été pensé pour répondre aux exigences les plus élevées."}
                        </div>
                        <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 h-fit space-y-6">
                            <h3 className="font-extrabold text-slate-900 flex items-center gap-2">
                                <Package className="w-5 h-5 text-indigo-500" />
                                Caractéristiques
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Marque', value: 'Premium Collection' },
                                    { label: 'Modèle', value: product.name },
                                    { label: 'SKU', value: `AZY-${product.id}-2024` },
                                    { label: 'Disponibilité', value: 'En Stock' }
                                ].map((spec, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200/50 text-sm">
                                        <span className="text-slate-400 font-medium">{spec.label}</span>
                                        <span className="font-bold text-slate-800">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ProductDetails;
