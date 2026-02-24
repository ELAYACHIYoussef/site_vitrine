import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import productService from '../api/productService';
import ProductCard from '../components/ProductCard';
import { Loader, Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured'); // featured, price_asc, price_desc, newest
    const [priceRange, setPriceRange] = useState([0, 2000]); // Max price realistically expected
    const [maxPrice, setMaxPrice] = useState(2000); // Dynamic max based on catalog

    // UI States
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    // Sync state with URL params on mount
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

                // Determine max price dynamically
                if (data.length > 0) {
                    const highestPrice = Math.max(...data.map(p => p.price || 0));
                    // Round up to nearest 100
                    const roundedMax = Math.ceil(highestPrice / 100) * 100;
                    setMaxPrice(roundedMax > 0 ? roundedMax : 2000);
                    setPriceRange([0, roundedMax > 0 ? roundedMax : 2000]);
                }
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Extract unique categories
    const categories = useMemo(() => {
        return ['All', ...new Set(products.map(p => p.categoryLabel || p.category).filter(Boolean))];
    }, [products]);

    // Apply Filters & Sort
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Search Query
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.description?.toLowerCase().includes(term)
            );
        }

        // 2. Category Filter
        if (selectedCategory !== 'All') {
            const catLower = selectedCategory.toLowerCase();
            result = result.filter(product => {
                const pCat = (product.categoryLabel || product.category || '').toLowerCase();
                return pCat === catLower || pCat.includes(catLower);
            });
        }

        // 3. Price Filter
        result = result.filter(product => {
            const price = product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // 4. Sorting
        switch (sortBy) {
            case 'price_asc':
                result.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price_desc':
                result.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case 'featured':
            default:
                // Sort by views or likes if possible, else ID
                result.sort((a, b) => ((b.views || 0) + (b.likes || 0)) - ((a.views || 0) + (a.likes || 0)));
                break;
        }

        return result;
    }, [products, searchTerm, selectedCategory, priceRange, sortBy]);


    const handleSearchChange = (val) => {
        setSearchTerm(val);
        updateURL({ search: val });
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        updateURL({ category: cat === 'All' ? null : cat });
    };

    const updateURL = (updates) => {
        const newParams = new URLSearchParams(searchParams);
        Object.keys(updates).forEach(key => {
            if (updates[key]) {
                newParams.set(key, updates[key]);
            } else {
                newParams.delete(key);
            }
        });
        setSearchParams(newParams);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setSortBy('featured');
        setPriceRange([0, maxPrice]);
        setSearchParams(new URLSearchParams()); // Clear URL
    };


    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 gap-4">
                <Loader className="w-12 h-12 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium tracking-wide">Préparation du catalogue...</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 py-12"
        >
            <div className="container mx-auto px-4">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl font-extrabold text-[#0f172a] mb-4 tracking-tight"
                    >
                        Notre Collection
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 max-w-2xl mx-auto text-lg"
                    >
                        Découvrez nos produits sélectionnés avec soin pour vous offrir le meilleur de la qualité.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Desktop Sidebar / Mobile Filters Overlay */}
                    <div className={`lg:w-1/4 flex-shrink-0 ${showFiltersMobile ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">

                            {/* Mobile Header */}
                            {showFiltersMobile && (
                                <div className="flex justify-between items-center mb-6 lg:hidden">
                                    <h2 className="text-xl font-bold text-slate-900">Filtres</h2>
                                    <button onClick={() => setShowFiltersMobile(false)} className="text-slate-500 hover:text-slate-800 p-2">
                                        Fermer ✕
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-6 border-b border-slate-100 pb-4">
                                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                                Filtrer les résultats
                            </div>

                            {/* Search */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Recherche</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Nom, description..."
                                        value={searchTerm}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
                                    Catégories
                                    <span className="text-xs font-normal text-slate-400">{filteredAndSortedProducts.length} produits</span>
                                </label>
                                <div className="flex flex-col gap-1.5">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat
                                                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            {cat === 'All' ? 'Toutes les catégories' : cat}
                                            {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-slate-700 mb-4">
                                    Prix Max : {priceRange[1]} €
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={maxPrice}
                                    step={10}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-2">
                                    <span>0 €</span>
                                    <span>{maxPrice} €</span>
                                </div>
                            </div>

                            {/* Reset */}
                            <button
                                onClick={resetFilters}
                                className="w-full py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                            >
                                Réinitialiser les filtres
                            </button>

                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:w-3/4 flex-1">

                        {/* Top Bar: Sort & Mobile Toggle */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">

                            <button
                                onClick={() => setShowFiltersMobile(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"
                            >
                                <Filter className="w-4 h-4" /> Filtres
                            </button>

                            <p className="text-sm text-slate-500 hidden sm:block">
                                Affichage de <span className="font-bold text-slate-900">{filteredAndSortedProducts.length}</span> résultat(s)
                            </p>

                            <div className="flex items-center gap-3 ml-auto">
                                <span className="text-sm text-slate-500 hidden sm:block">Trier par:</span>
                                <div className="relative">
                                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none cursor-pointer"
                                    >
                                        <option value="featured">Pertinence</option>
                                        <option value="newest">Nouveautés</option>
                                        <option value="price_asc">Prix Croissant</option>
                                        <option value="price_desc">Prix Décroissant</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredAndSortedProducts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Aucun produit trouvé</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-6">Essayez d'ajuster vos critères de recherche ou de retirer certains filtres.</p>
                                <button
                                    onClick={resetFilters}
                                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                                >
                                    Effacer les filtres
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {filteredAndSortedProducts.map((product, index) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            key={product.id}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default ProductCatalog;
