import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center justify-center gap-3">
                        <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                        Mes Favoris
                    </h1>
                    <p className="text-slate-600">
                        {wishlist.length} article{wishlist.length > 1 ? 's' : ''} dans votre liste de souhaits
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-300">
                            <Heart className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Votre liste est vide</h2>
                        <p className="text-slate-500 mb-8">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:translate-y-px"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Découvrir nos produits
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
