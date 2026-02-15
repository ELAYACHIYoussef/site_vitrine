import React, { useState, useEffect } from 'react';
import { getCatalogStats } from '../../api/dashboardService';
import { getCategories, createCategory, deleteCategory } from '../../api/categoryService';
import { Layers, Package, ArrowRight, Loader, Plus, Trash2, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', label: '', description: '', icon: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsData, dbCategories] = await Promise.all([
                getCatalogStats(),
                getCategories().catch(() => []) // Handle case where endpoint might fail if service not ready
            ]);

            // Map stats by name
            const statsMap = new Map();
            if (statsData && statsData.productsByCategory) {
                Object.entries(statsData.productsByCategory).forEach(([name, count]) => {
                    statsMap.set(name.toLowerCase(), count);
                });
            }

            // Merge Logic
            let merged = [];
            const processedNames = new Set();

            // 1. Process DB Categories
            if (Array.isArray(dbCategories)) {
                merged = dbCategories.map(cat => {
                    processedNames.add(cat.name.toLowerCase());
                    return {
                        ...cat,
                        source: 'db',
                        count: statsMap.get(cat.name.toLowerCase()) || 0
                    };
                });
            }

            // 2. Process Unmanaged Categories (from products)
            statsMap.forEach((count, name) => {
                if (!processedNames.has(name)) {
                    merged.push({
                        id: `temp-${name}`,
                        name: name, // Capitalize first letter logic could go here
                        label: name.charAt(0).toUpperCase() + name.slice(1),
                        description: 'Catégorie détectée via les produits',
                        source: 'product',
                        count: count
                    });
                }
            });

            setCategories(merged);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Erreur lors du chargement des données");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCategory.name || !newCategory.label) {
            toast.error("Le nom et le libellé sont requis");
            return;
        }

        try {
            setSubmitting(true);
            await createCategory(newCategory);
            toast.success("Catégorie créée avec succès");
            setIsModalOpen(false);
            setNewCategory({ name: '', label: '', description: '', icon: '' });
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la création");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, source) => {
        if (source === 'product') {
            toast.error("Impossible de supprimer une catégorie déduite des produits. Supprimez les produits associés d'abord.");
            return;
        }

        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                await deleteCategory(id);
                toast.success("Catégorie supprimée");
                fetchData();
            } catch (error) {
                console.error(error);
                toast.error("Erreur lors de la suppression");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Catégories</h1>
                    <p className="text-slate-500">Gérez vos catégories de produits ({categories.length})</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter une catégorie
                </button>
            </div>

            {categories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <Layers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucune catégorie</h3>
                    <p className="text-slate-600 mb-6">Commencez par ajouter votre première catégorie.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Créer une catégorie
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative group hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <div className="flex gap-2">
                                    {cat.source === 'db' && (
                                        <button
                                            onClick={() => handleDelete(cat.id, cat.source)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mb-1">{cat.label || cat.name}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                {cat.description || 'Aucune description'}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                    {cat.count} produits
                                </span>
                                <Link
                                    to={`/admin/products?search=${cat.name}`}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>

                            {cat.source === 'product' && (
                                <div className="absolute top-2 right-2">
                                    <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                                        <AlertCircle className="w-3 h-3" />
                                        Auto
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Create Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-scaleIn">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-bold text-slate-900">Nouvelle Catégorie</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nom (clé technique)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ex: electronics"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                                />
                                <p className="text-xs text-slate-400 mt-1">Utilisé pour les URLs et le système. Minuscules, sans espaces.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Libellé (Affichage)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ex: Électronique"
                                    value={newCategory.label}
                                    onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Description de la catégorie..."
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none resize-none"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
                                >
                                    {submitting ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Categories;
