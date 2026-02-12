import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogService } from '../api';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Check, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await catalogService.getProduct(id);
                setProduct(response.data);
                if (response.data) {
                    await catalogService.incrementView(id);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

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

    return (
        <div className="container mx-auto px-6 py-12">
            <Link to="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au catalogue
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Image Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative group">
                        <img
                            src={product.thumbnail || 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                            <button className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white hover:text-rose-500 transition-all text-slate-400">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="mb-2">
                        <span className="text-indigo-600 font-bold tracking-wider text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">
                            {product.categoryLabel || 'Collection'}
                        </span>
                    </div>

                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center space-x-4 mb-6">
                        <span className="text-3xl font-extrabold text-slate-900">{product.price} €</span>
                        <div className="flex items-center text-amber-400 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-slate-400 ml-2">(42 avis)</span>
                        </div>
                    </div>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        {product.descriptionCourte || "Découvrez l'excellence avec ce produit conçu pour allier performance et esthétique. Fabriqué avec des matériaux de première qualité pour une durabilité exceptionnelle."}
                    </p>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {[
                            { icon: Check, text: "En stock, expédié sous 24h" },
                            { icon: Shield, text: "Garantie constructeur 2 ans" },
                            { icon: Truck, text: "Livraison gratuite" },
                            { icon: Share2, text: "Retour sous 30 jours" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center text-sm text-slate-600">
                                <item.icon className="w-4 h-4 mr-2 text-indigo-500" />
                                {item.text}
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button className="flex-1 btn-primary flex items-center justify-center gap-2 group">
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Ajouter au panier
                        </button>
                        <button className="btn-secondary !text-slate-600 !border-slate-200 hover:!bg-slate-50 hover:!border-indigo-200">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mt-8 border-t border-slate-100 pt-8">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Description Détaillée</h3>
                        <div className="prose prose-slate text-slate-500">
                            <p>
                                {product.descriptionLongue || "Ce produit représente le summum de notre savoir-faire. Chaque détail a été pensé pour vous offrir une expérience utilisateur sans compromis. Que ce soit pour un usage quotidien ou professionnel, il saura répondre à toutes vos exigences avec élégance et efficacité."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails;
