import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Calendar } from 'lucide-react';
import { customerService } from '../../api/customerService';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../../hooks/animations';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch all users
                const users = await customerService.getAllCustomers();

                // 2. Fetch all orders (more efficient than N+1 calls if list is huge, but here N+1 is fine for small scale)
                // Actually, let's fetch all orders once if possible, or per user.
                // Since we created getAllOrders in service, let's use that if available, otherwise per user.
                // Assuming getAllOrders works for admin
                const allOrders = await customerService.getAllOrders();

                // 3. Merge data
                const customersWithStats = users.map(user => {
                    const userOrders = allOrders.filter(order => order.userId === user.id);
                    const totalSpent = userOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                    return {
                        ...user,
                        ordersCount: userOrders.length,
                        totalSpent: totalSpent.toFixed(2)
                    };
                });

                setCustomers(customersWithStats);
            } catch (error) {
                console.error("Error loading customers:", error);
                toast.error("Erreur lors du chargement des clients");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-64"
            >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="container mx-auto px-4 py-8"
        >
            <motion.h1 variants={fadeInUp} className="text-3xl font-bold text-slate-900 mb-2">Clients</motion.h1>
            <motion.p variants={fadeInUp} className="text-slate-500 mb-8">Liste des clients enregistrés</motion.p>

            <motion.div variants={scaleIn} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Client</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Date d'inscription</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Commandes</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Total Dépensé</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {customers.length === 0 ? (
                                    <motion.tr
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                            Aucun client trouvé.
                                        </td>
                                    </motion.tr>
                                ) : (
                                    customers.map((customer) => (
                                        <motion.tr
                                            variants={staggerItem}
                                            layout
                                            key={customer.id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">
                                                        {customer.username ? customer.username.charAt(0) : '?'}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-slate-900 block">{customer.username}</span>
                                                        <span className="text-xs text-slate-500 capitalize">{customer.role}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-semibold">
                                                    {customer.ordersCount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-green-600">
                                                {customer.totalSpent} €
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Customers;
