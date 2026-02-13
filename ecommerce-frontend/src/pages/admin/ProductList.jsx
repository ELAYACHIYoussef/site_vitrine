import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import productService from '../../api/productService';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors du chargement des produits');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (product) => {
        setDeleteModal({ isOpen: true, product });
    };

    const handleDeleteConfirm = async () => {
        const { product } = deleteModal;
        setIsDeleting(true);

        try {
            await productService.deleteProduct(product.id);
            toast.success(`"${product.name}" supprimé avec succès`);
            setDeleteModal({ isOpen: false, product: null });
            loadProducts(); // Refresh list
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur lors de la suppression');
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Gestion des Produits</h1>
                    <p className="text-slate-600 mt-2">{products.length} produit(s) au total</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/new')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#FF6835] text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30 font-semibold"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un Produit
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou catégorie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6835] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    />
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Package className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-slate-600">Chargement des produits...</p>
                    </div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun produit trouvé</h3>
                    <p className="text-slate-600 mb-6">
                        {searchTerm ? 'Aucun produit ne correspond à votre recherche' : 'Commencez par ajouter votre premier produit'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => navigate('/admin/products/new')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6835] text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            Ajouter un Produit
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden group hover:shadow-xl transition-all">
                            {/* Image */}
                            <div className="aspect-square bg-slate-100 overflow-hidden">
                                {product.thumbnail || product.images?.[0] ? (
                                    <img
                                        src={`http://localhost:8082${product.thumbnail || product.images[0]}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-16 h-16 text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-slate-900 line-clamp-2 flex-1">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-600 mb-3">{product.categoryLabel || product.category}</p>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-[#FF6835]">
                                        {product.price?.toFixed(2)} €
                                    </span>
                                    <span className="text-sm text-slate-600">
                                        Stock: {product.stock || 0}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6835] hover:bg-orange-700 rounded-lg transition-colors text-white font-medium"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg shadow-red-500/30"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, product: null })}
                onConfirm={handleDeleteConfirm}
                productName={deleteModal.product?.name || ''}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default ProductList;
