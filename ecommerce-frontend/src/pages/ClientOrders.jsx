import React, { useState, useEffect } from 'react';
import { getOrdersByUser } from '../api/orderService';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronRight, ShoppingBag, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../hooks/animations';

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

    const downloadInvoice = (order) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(79, 70, 229); // Indigo-600
        doc.text("VITRINE.IO", 14, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Facture #" + (order.orderNumber || order.id), 14, 30);
        doc.text("Date: " + format(new Date(order.createdAt), 'dd/MM/yyyy'), 14, 35);

        // Client Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Client:", 14, 45);
        doc.setFontSize(10);
        doc.text(user.username || "Client", 14, 50);
        doc.text(user.email || "", 14, 55);

        // Table
        const tableColumn = ["Produit", "Quantité", "Prix Unit.", "Total"];
        const tableRows = [];

        order.items.forEach(item => {
            const itemData = [
                item.productName,
                item.quantity,
                item.price?.toFixed(2) + " €",
                (item.quantity * item.price)?.toFixed(2) + " €"
            ];
            tableRows.push(itemData);
        });

        autoTable(doc, {
            startY: 65,
            head: [tableColumn],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [79, 70, 229] },
        });

        // Total
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text("Total: " + order.totalAmount?.toFixed(2) + " €", 14, finalY);

        doc.save(`facture_${order.orderNumber || order.id}.pdf`);
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
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="container mx-auto px-4 max-w-5xl"
            >
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm"
                    >
                        <ShoppingBag className="w-8 h-8" />
                    </motion.div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mes Commandes</h1>
                        <p className="text-slate-500 font-medium">Suivez l'état de vos achats récents</p>
                    </div>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-16 text-center"
                    >
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Aucune commande</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Vous n'avez pas encore passé de commande. C'est le moment idéal pour commencer !</p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                            Découvrir nos produits
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div variants={staggerContainer} className="space-y-6">
                        <AnimatePresence mode='popLayout'>
                            {orders.map((order) => (
                                <motion.div
                                    layout
                                    variants={staggerItem}
                                    key={order.id}
                                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                                >
                                    {/* Header Wrapper */}
                                    <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="font-black text-xl text-slate-900">Commande #{order.orderNumber || order.id}</span>
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`px-4 py-1.5 rounded-xl text-xs font-black border flex items-center gap-1.5 shadow-sm ${getStatusColor(order.status)}`}
                                                >
                                                    {getStatusIcon(order.status)}
                                                    {getStatusLabel(order.status).toUpperCase()}
                                                </motion.span>
                                            </div>
                                            <p className="text-slate-400 text-sm flex items-center gap-2 font-medium">
                                                <Clock className="w-3.5 h-3.5" />
                                                Passée le {order.createdAt ? format(new Date(order.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr }) : 'Date inconnue'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total TTC</p>
                                                <p className="text-2xl font-black text-indigo-600">{order.totalAmount?.toFixed(2)} €</p>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1, backgroundColor: '#f5f3ff' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => downloadInvoice(order)}
                                                className="p-3 text-indigo-600 bg-indigo-50/50 rounded-2xl transition-all tooltip"
                                                title="Télécharger la facture"
                                            >
                                                <Download className="w-5 h-5" />
                                            </motion.button>
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ClientOrders;
