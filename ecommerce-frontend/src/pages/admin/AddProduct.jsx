import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Instagram } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';
import productService from '../../api/productService';
import { getCategories } from '../../api/categoryService';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        categoryLabel: '',
        price: '',
        stock: '',
        description: '',
        descriptionCourte: '',
        videoUrl: ''
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                // Map to format { value: 'name', label: 'Label' }
                const formatted = data.map(cat => ({
                    value: cat.name,
                    label: cat.label || cat.name
                }));
                setCategories(formatted);
            } catch (error) {
                console.error("Failed to load categories", error);
                // Fallback or empty
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.category || !formData.price) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (images.length === 0) {
            toast.error('Veuillez ajouter au moins une image');
            return;
        }

        setLoading(true);

        try {
            await productService.createProduct(formData, images);
            toast.success('Produit créé avec succès !');
            navigate('/admin/products');
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors de la création du produit: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Retour à la liste</span>
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900">Ajouter un Produit</h1>
                    <p className="text-slate-600 mt-2">Créez un nouveau produit avec images et informations</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Product Info */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
                                Informations du Produit
                            </h2>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Nom du Produit <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: iPhone 13 Pro"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Catégorie <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    required
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Category Label */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Label Catégorie
                                </label>
                                <input
                                    type="text"
                                    name="categoryLabel"
                                    value={formData.categoryLabel}
                                    onChange={handleChange}
                                    placeholder="Ex: Apple"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                            </div>

                            {/* Price & Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Prix (€) <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="1099"
                                        step="0.01"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="50"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description Courte
                                </label>
                                <textarea
                                    name="descriptionCourte"
                                    value={formData.descriptionCourte}
                                    onChange={handleChange}
                                    placeholder="Brève description pour la carte produit..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    URL de la Vidéo (MP4, YouTube, Instagram)
                                </label>
                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="Ex: https://example.com/video.mp4"
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                />
                                <p className="text-xs text-slate-500 mt-1">Laissez vide si aucune vidéo</p>
                            </div>

                        </div>

                        {/* Right Column - Images & Export */}
                        <div className="space-y-6">
                            {/* Marketing & Export Section */}
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg text-white">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-indigo-200" />
                                    Marketing & Export
                                </h3>
                                <div className="p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                name="publishToInstagram"
                                                id="publishToInstagram"
                                                checked={formData.publishToInstagram || false}
                                                onChange={(e) => setFormData(prev => ({ ...prev, publishToInstagram: e.target.checked }))}
                                                className="sr-only"
                                            />
                                            <div className={`w-14 h-7 rounded-full transition-all duration-300 ${formData.publishToInstagram ? 'bg-green-400' : 'bg-white/20'}`}></div>
                                            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${formData.publishToInstagram ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">Publier sur Instagram</span>
                                            <span className="text-[10px] text-indigo-100 opacity-80">Synchronisation automatique</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <ImageUpload
                                images={images}
                                onChange={setImages}
                                maxImages={6}
                            />
                        </div>
                    </div>

                    {/* Full Width Description */}
                    <div className="mt-8 pt-8 border-t">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description Détaillée
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description complète du produit avec toutes les caractéristiques techniques..."
                            rows="6"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Création...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Créer le Produit
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
