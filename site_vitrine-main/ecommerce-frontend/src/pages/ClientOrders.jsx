import React, { useState, useEffect } from 'react';
import { getOrdersByUser } from '../api/orderService';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ClientOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const data = await getOrdersByUser(user.id);
            // Sort by most recent
            const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sortedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'SHIPPED': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-4 h-4" />;
            case 'CONFIRMED': return <CheckCircle className="w-4 h-4" />;
            case 'SHIPPED': return <Truck className="w-4 h-4" />;
            case 'DELIVERED': return <Package className="w-4 h-4" />;
            case 'CANCELLED': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'PENDING': 'En attente',
            'CONFIRMED': 'Confirmée',
            'SHIPPED': 'Expédiée',
            'DELIVERED': 'Livrée',
            'CANCELLED': 'Annulée'
        };
        return labels[status] || status;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Mes Commandes</h1>
                        <p className="text-slate-500">Suivez l'état de vos achats récents</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune commande</h3>
                        <p className="text-slate-500 mb-8">Vous n'avez pas encore passé de commande.</p>
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                            Découvrir nos produits
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Header Wrapper */}
                                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-lg text-slate-900">Commande #{order.orderNumber || order.id}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 text-sm flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            Passée le {order.createdAt ? format(new Date(order.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr }) : 'Date inconnue'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Total</p>
                                        <p className="text-xl font-bold text-indigo-600">{order.totalAmount?.toFixed(2)} €</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-6 bg-slate-50/50">
                                    <div className="space-y-4">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs">
                                                        IMG
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 line-clamp-1">{item.productName}</p>
                                                        <p className="text-sm text-slate-500">{item.quantity} x {item.price?.toFixed(2)} €</p>
                                                    </div>
                                                </div>
                                                <p className="font-medium text-slate-700">{(item.quantity * item.price)?.toFixed(2)} €</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                {/* 
                                <div className="px-6 py-4 bg-gray-50 border-t border-slate-100 flex justify-end">
                                    <button className="text-indigo-600 font-semibold text-sm hover:underline flex items-center gap-1">
                                        Voir les détails <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                                */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientOrders;
