import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../api/productService';
import ProductCard from '../components/ProductCard';
import { Loader, Search, Filter } from 'lucide-react';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Sync state with URL params
    useEffect(() => {
        const querySearch = searchParams.get('search') || '';
        const queryCategory = searchParams.get('category') || 'All';
        setSearchTerm(querySearch);
        setSelectedCategory(queryCategory);
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Normalize comparison for categories (case insensitive)
        const productCat = (product.categoryLabel || product.category || '').toLowerCase();
        const selectedCatLower = selectedCategory.toLowerCase();

        const matchesCategory = selectedCategory === 'All' ||
            productCat === selectedCatLower ||
            productCat.includes(selectedCatLower); // Partial match for safety

        return matchesSearch && matchesCategory;
    });

    // Extract unique categories
    const categories = ['All', ...new Set(products.map(p => p.categoryLabel || p.category).filter(Boolean))];

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <Loader className="w-12 h-12 text-[#FF6835] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-[#0f172a] mb-4">
                        Notre Collection
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Découvrez nos produits sélectionnés avec soin pour vous offrir le meilleur de la qualité.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchTerm(val);
                                setSearchParams({ search: val, category: selectedCategory === 'All' ? '' : selectedCategory });
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Filter className="w-5 h-5 text-slate-400 shrink-0" />
                        <div className="flex gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setSearchParams({ search: searchTerm, category: cat === 'All' ? '' : cat });
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? 'bg-[#0f172a] text-white shadow-lg'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">Aucun produit ne correspond à vos critères.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-4 text-[#FF6835] font-semibold hover:underline"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCatalog;
