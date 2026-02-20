import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogService } from '../api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Check, Truck, Shield } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hooks must be at the top level
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
                    // Set default variants if available
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
            // Create a variant-aware product object for the cart
            const cartItem = {
                ...product,
                selectedSize,
                selectedColor,
                quantity // Pass quantity if supported by cart context, otherwise handled there
            };
            addToCart(cartItem);
            // Note: If addToCart doesn't support quantity yet, it might just add 1.
            // For now we assume standard addToCart behavior.
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

    // Fallback data for demo if backend fields are empty
    const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
    const colors = product.colors && product.colors.length > 0 ? product.colors : ['Noir', 'Bleu', 'Gris'];
    const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail];

    const discount = 20; // Fake discount for styling
    const originalPrice = (product.price * 1.25).toFixed(2);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb & Navigation */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 py-3 text-sm text-slate-500">
                    <Link to="/" className="hover:text-amber-600">Accueil</Link>
                    <span className="mx-2">›</span>
                    <span className="text-slate-900 font-medium truncate">{product.name}</span>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Thumbnails (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setActiveImage(product.thumbnail)}
                                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImage === product.thumbnail
                                    ? 'border-amber-500 shadow-md'
                                    : 'border-slate-200 hover:border-amber-300'}`}
                            >
                                <img src={getImageUrl(product.thumbnail)} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImage === img
                                        ? 'border-amber-500 shadow-md'
                                        : 'border-slate-200 hover:border-amber-300'}`}
                                >
                                    <img src={getImageUrl(img)} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CENTER COLUMN: Main Image */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={activeImage}
                            className="aspect-[4/5] lg:aspect-square bg-white rounded-xl overflow-hidden sticky top-8 flex items-center justify-center p-4"
                        >
                            <img
                                src={getImageUrl(activeImage || product.thumbnail)}
                                alt={product.name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />

                            {/* Mobile Thumbnails Overlay */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden px-4 overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-12 h-12 flex-shrink-0 rounded bg-white border ${activeImage === img ? 'border-amber-500' : 'border-slate-200'}`}
                                    >
                                        <img src={getImageUrl(img)} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Product Info & Buy Box */}
                    <div className="lg:col-span-6 space-y-6">

                        {/* Title & Ratings */}
                        <div className="border-b border-slate-100 pb-4">
                            <h1 className="text-3xl font-medium text-slate-900 mb-2 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 group cursor-pointer w-fit">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                                <span className="text-indigo-600 hover:text-amber-600 text-sm font-medium">
                                    4.2 (420 avis)
                                </span>
                            </div>
                        </div>

                        {/* Price Block */}
                        <div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-red-600 text-sm font-medium">-{discount}%</span>
                                <span className="text-4xl font-bold text-slate-900">
                                    {product.price} <span className="text-xl align-top">€</span>
                                </span>
                            </div>
                            <div className="text-slate-500 text-sm mt-1">
                                Prix conseillé : <span className="line-through">{originalPrice} €</span>
                            </div>
                            <div className="text-sm text-slate-700 mt-2">
                                <span className="text-slate-900 font-bold">Tous les prix incluent la TVA.</span>
                            </div>
                        </div>

                        {/* Description Short */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">À propos de cet article</h3>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                {product.descriptionCourte || "Un produit d'exception alliant qualité et performance."}
                            </p>
                        </div>

                        {/* Variants Selection */}
                        <div className="space-y-4 pt-4">
                            {/* Dynamic Labels Logic */}
                            {(() => {
                                const getVariantLabels = (cat) => {
                                    if (!cat) return { size: 'Taille', color: 'Couleur' };
                                    const c = cat.toLowerCase();
                                    if (c.includes('chaussure') || c.includes('shoes') || c.includes('botte') || c.includes('basket')) return { size: 'Pointure', color: 'Couleur' };
                                    if (c.includes('tech') || c.includes('phone') || c.includes('ordi') || c.includes('tablette')) return { size: 'Capacité', color: 'Couleur' };
                                    if (c.includes('maison') || c.includes('meuble') || c.includes('lit') || c.includes('deco')) return { size: 'Dimensions', color: 'Couleur' };
                                    if (c.includes('beaute') || c.includes('parfum') || c.includes('soin')) return { size: 'Contenance', color: 'Nuance' };
                                    return { size: 'Taille', color: 'Couleur' };
                                };
                                const labels = getVariantLabels(product.category || product.categoryLabel);

                                return (
                                    <>
                                        {/* Sizes / Dimensions / Capacity */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm font-bold text-slate-700">{labels.size}: <span className="font-normal text-slate-600">{selectedSize || 'Sélectionner'}</span></span>
                                                {labels.size === 'Taille' && <button className="text-sm text-indigo-600 hover:underline">Guide des tailles</button>}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {sizes.map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`min-w-[48px] px-3 py-2 text-sm border rounded-md transition-all ${selectedSize === size
                                                            ? 'border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500 font-bold'
                                                            : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Colors / Nuance */}
                                        <div>
                                            <span className="text-sm font-bold text-slate-700 block mb-2">{labels.color}: <span className="font-normal text-slate-600">{selectedColor || 'Sélectionner'}</span></span>
                                            <div className="flex flex-wrap gap-3">
                                                {colors.map(color => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`px-4 py-2 text-sm border rounded-full transition-all ${selectedColor === color
                                                            ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500 font-bold'
                                                            : 'border-slate-300 bg-white hover:bg-slate-50'
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
                        </div>

                        {/* BUY BOX */}
                        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm mt-8 relative overflow-hidden">
                            {/* Decorative gradient top bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>

                            <div className="space-y-4">
                                <div className="flex items-center text-emerald-600 font-bold text-lg">
                                    <Check className="w-5 h-5 mr-2" />
                                    En stock
                                </div>
                                <div className="text-sm">
                                    <span className="text-slate-600">Livraison GRATUITE </span>
                                    <span className="font-bold text-slate-900">
                                        {deliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm py-2">
                                    <div className="flex items-center text-slate-600">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Garantie 2 ans
                                    </div>
                                    <div className="flex items-center text-slate-600">
                                        <Truck className="w-4 h-4 mr-2" />
                                        Expédié par AzyMarket
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-slate-700">Quantité :</label>
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="border border-slate-300 rounded-md py-1 px-2 text-sm bg-slate-50 hover:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow outline-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Buttons */}
                                <div className="space-y-3 pt-2">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium py-3 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5"
                                    >
                                        Ajouter au panier
                                    </button>
                                    <button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5"
                                    >
                                        Acheter maintenant
                                    </button>
                                </div>

                                <div className="pt-4 flex justify-center">
                                    <button
                                        onClick={() => toggleWishlist(product, user?.id)}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${isInWishlist(product.id) ? 'text-rose-500' : 'text-slate-500 hover:text-rose-600'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                        {isInWishlist(product.id) ? 'Retirer de la liste' : 'Ajouter à ma liste'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Technical Details Section */}
                <div className="mt-16 pt-10 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Description du produit</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 prose prose-slate max-w-none">
                            <p>{product.description || product.descriptionLongue}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 h-fit">
                            <h3 className="font-bold text-slate-900 mb-4">Caractéristiques</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500">Marque</span>
                                    <span className="font-medium text-slate-900">Premium Brand</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500">Modèle</span>
                                    <span className="font-medium text-slate-900">{product.name}</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500">SKU</span>
                                    <span className="font-medium text-slate-900">REF-{product.id}-2024</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
