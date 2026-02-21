import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../api/orderService';
import {
    ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock,
    MapPin, Mail, User, Calendar, CreditCard, Printer, ShoppingBag
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const STATUS_CONFIG = {
    PENDING: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, label: 'En attente' },
    VALIDATED: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle, label: 'Validée' },
    SHIPPED: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Truck, label: 'Expédiée' },
    DELIVERED: { color: 'bg-green-100 text-green-700 border-green-200', icon: Package, label: 'Livrée' },
    CANCELLED: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Annulée' }
};

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const data = await getOrderById(id);
            setOrder(data);
        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Impossible de charger la commande");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            const updatedOrder = await updateOrderStatus(id, newStatus);
            setOrder(updatedOrder);
            toast.success(`Statut mis à jour : ${STATUS_CONFIG[newStatus].label}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Erreur lors de la mise à jour");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">Commande introuvable</h2>
                <Link to="/admin/orders" className="text-indigo-600 hover:underline mt-4 inline-block">
                    Retour aux commandes
                </Link>
            </div>
        );
    }

    const StatusIcon = STATUS_CONFIG[order.status]?.icon || Clock;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin/orders" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            Commande #{order.id}
                            <span className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center gap-1.5 ${STATUS_CONFIG[order.status]?.color || 'bg-gray-100'}`}>
                                <StatusIcon className="w-4 h-4" />
                                {STATUS_CONFIG[order.status]?.label || order.status}
                            </span>
                        </h1>
                        <p className="text-slate-500 mt-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Passée le {order.createdAt ? format(new Date(order.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr }) : 'Date inconnue'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors">
                        <Printer className="w-4 h-4" />
                        Imprimer
                    </button>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors outline-none cursor-pointer border-r-8 border-transparent"
                    >
                        {Object.keys(STATUS_CONFIG).map(status => (
                            <option key={status} value={status} className="bg-white text-slate-900">
                                Marquer comme {STATUS_CONFIG[status].label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Items & Summary */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-indigo-500" />
                                Articles ({order.items?.length || 0})
                            </h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                        {/* Placeholder for product image if not available in item data */}
                                        <Package className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-900">{item.productName}</h3>
                                        <p className="text-sm text-slate-500">Réf: PRD-{item.productId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-slate-900">{item.price?.toFixed(2)} €</p>
                                        <p className="text-sm text-slate-500">x {item.quantity}</p>
                                    </div>
                                    <div className="w-24 text-right font-bold text-indigo-600">
                                        {(item.price * item.quantity).toFixed(2)} €
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                            <div className="flex justify-between items-center text-slate-600 mb-2">
                                <span>Sous-total</span>
                                <span>{order.totalAmount?.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600 mb-2">
                                <span>Livraison</span>
                                <span className="text-green-600">Offerte</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-3">
                                <span className="font-bold text-lg text-slate-900">Total</span>
                                <span className="font-bold text-xl text-indigo-600">{order.totalAmount?.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline/Notes (Placeholder for future features) */}
                    {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Historique</h3>
                        ...
                    </div> */}
                </div>

                {/* Right Column: Customer & Shipping Info */}
                <div className="space-y-6">
                    {/* Customer Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-indigo-500" />
                            Client
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                                {order.customerName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{order.customerName}</p>
                                <p className="text-sm text-slate-500">Client fidèle</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Mail className="w-4 h-4 text-slate-400" />
                                <a href={`mailto:${order.customerEmail}`} className="hover:text-indigo-600 transition-colors truncate">
                                    {order.customerEmail}
                                </a>
                            </div>
                            {/* <div className="flex items-center gap-3 text-slate-600">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <span>+33 6 12 34 56 78 (Mock)</span>
                            </div> */}
                        </div>
                    </div>

                    {/* Shipping Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Truck className="w-5 h-5 text-indigo-500" />
                            Livraison
                        </h2>
                        <div className="flex items-start gap-3 text-slate-600 mb-4">
                            <MapPin className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                            <p className="leading-relaxed">
                                {order.shippingAddress}
                            </p>
                        </div>
                        {/* <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100">
                            Méthode : Standard (Colissimo)
                        </div> */}
                    </div>

                    {/* Payment Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-indigo-500" />
                            Paiement
                        </h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-600">Statut</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">PAYÉ</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600">Méthode</span>
                            <span className="text-slate-900 font-medium">Carte Bancaire</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
