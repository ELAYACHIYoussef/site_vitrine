import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '../../components/ImageUpload';
import productService from '../../api/productService';
import { getImageUrl } from '../../utils/imageUtils';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        categoryLabel: '',
        price: '',
        stock: '',
        description: '',
        descriptionCourte: ''
    });

    const categories = [
        { value: 'smartphones', label: 'Smartphones' },
        { value: 'laptops', label: 'Ordinateurs Portables' },
        { value: 'tablets', label: 'Tablettes' },
        { value: 'accessories', label: 'Accessoires' },
        { value: 'audio', label: 'Audio' },
    ];

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const product = await productService.getProductById(id);

            setFormData({
                name: product.name || '',
                category: product.category || '',
                categoryLabel: product.categoryLabel || '',
                price: product.price || '',
                stock: product.stock || '',
                description: product.description || '',
                descriptionCourte: product.descriptionCourte || ''
            });

            // Store existing images
            if (product.images && product.images.length > 0) {
                setExistingImages(product.images);
            }
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors du chargement du produit');
            navigate('/admin/products');
        } finally {
            setLoadingProduct(false);
        }
    };

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

        setLoading(true);

        try {
            // Update product with FormData
            await productService.updateProduct(id, formData, images);
            toast.success('Produit modifié avec succès !');
            navigate('/admin/products');
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors de la modification: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    if (loadingProduct) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-[#FF6835] mx-auto mb-4 animate-spin" />
                        <p className="text-slate-600">Chargement du produit...</p>
                    </div>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-slate-900">Modifier le Produit</h1>
                    <p className="text-slate-600 mt-2">Modifiez les informations et images du produit</p>
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
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
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
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
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
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
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
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Column - Images */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
                                Images du Produit
                            </h2>

                            {/* Existing Images Display */}
                            {existingImages.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm text-slate-600 mb-2">Images actuelles:</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {existingImages.map((img, idx) => (
                                            <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-slate-200">
                                                <img
                                                    src={getImageUrl(img)}
                                                    alt={`Image ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">
                                        Les nouvelles images s'ajouteront aux images existantes
                                    </p>
                                </div>
                            )}

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
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none"
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
                        className="px-6 py-3 rounded-lg bg-[#FF6835] text-white font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Modification...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Enregistrer les Modifications
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
