import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Search, Save, X, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import productService from '../../api/productService';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import { getImageUrl } from '../../utils/imageUtils';

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
    const [isDeleting, setIsDeleting] = useState(false);

    // Quick Stock State
    const [editingStock, setEditingStock] = useState(null); // { id: 1, value: 50 }
    const [isUpdatingStock, setIsUpdatingStock] = useState(false);

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

    const handleStockUpdate = async (product, newStock) => {
        if (newStock < 0) return;
        setIsUpdatingStock(true);
        try {
            await productService.updateProduct(product.id, { stock: parseInt(newStock) }, null);
            toast.success("Stock mis à jour");

            // Optimistic update
            setProducts(products.map(p =>
                p.id === product.id ? { ...p, stock: parseInt(newStock) } : p
            ));
            setEditingStock(null);
        } catch (error) {
            console.error(error);
            toast.error("Erreur mise à jour stock");
        } finally {
            setIsUpdatingStock(false);
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
                            <div className="aspect-square bg-slate-100 overflow-hidden relative">
                                {product.thumbnail || product.images?.[0] ? (
                                    <img
                                        src={getImageUrl(product.thumbnail || product.images[0])}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Package className="w-16 h-16 text-slate-300" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    ID: {product.id}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-bold text-slate-900 line-clamp-2 flex-1 h-12">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="text-sm text-slate-600 mb-3">{product.categoryLabel || product.category}</p>

                                <div className="flex items-center justify-between mb-4 bg-slate-50 p-2 rounded-lg">
                                    <span className="text-xl font-bold text-[#FF6835]">
                                        {product.price?.toFixed(2)} €
                                    </span>

                                    {/* Quick Stock Control */}
                                    <div className="flex items-center gap-2">
                                        {editingStock?.id === product.id ? (
                                            <div className="flex items-center gap-1">
                                                <input
                                                    type="number"
                                                    value={editingStock.value}
                                                    onChange={(e) => setEditingStock({ ...editingStock, value: e.target.value })}
                                                    className="w-16 px-2 py-1 text-sm border border-indigo-300 rounded focus:border-indigo-500 outline-none"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleStockUpdate(product, editingStock.value)}
                                                    className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingStock(null)}
                                                    className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 group/stock">
                                                <button
                                                    onClick={() => handleStockUpdate(product, Math.max(0, (product.stock || 0) - 1))}
                                                    className="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
                                                    disabled={isUpdatingStock}
                                                >
                                                    -
                                                </button>
                                                <span
                                                    className="text-sm font-medium text-slate-700 min-w-[3ch] text-center cursor-pointer hover:text-indigo-600 hover:underline decoration-dashed underline-offset-4"
                                                    onClick={() => setEditingStock({ id: product.id, value: product.stock || 0 })}
                                                    title="Cliquez pour éditer"
                                                >
                                                    {product.stock || 0}
                                                </span>
                                                <button
                                                    onClick={() => handleStockUpdate(product, (product.stock || 0) + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
                                                    disabled={isUpdatingStock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF6835] hover:bg-orange-700 rounded-lg transition-colors text-white font-medium shadow-sm"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(product)}
                                        className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
