import React, { useState, useEffect } from 'react';
import { getCatalogStats } from '../../api/dashboardService';
import { Layers, Package, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCatalogStats();
                // data.productsByCategory is a Map/Object: { "Electronics": 5, "Clothing": 10 }
                if (data && data.productsByCategory) {
                    const params = Object.entries(data.productsByCategory).map(([name, count]) => ({
                        name,
                        count
                    }));
                    setCategories(params);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Erreur lors du chargement des catégories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Catégories</h1>
            <p className="text-slate-500 mb-8">Vue d'ensemble des catégories de produits</p>

            {categories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <Layers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucune catégorie trouvée</h3>
                    <p className="text-slate-600">Ajoutez des produits pour créer automatiquement des catégories.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">{cat.name}</h3>
                                    <p className="text-slate-500 text-sm">{cat.count} produit{cat.count > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            <Link
                                to={`/admin/products?search=${cat.name}`}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                                title="Voir les produits"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;
