import React from 'react';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const stats = [
        {
            title: 'Revenus Totaux',
            value: '45,231 €',
            change: '+12.5%',
            positive: true,
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Commandes',
            value: '1,234',
            change: '+8.2%',
            positive: true,
            icon: ShoppingCart,
            color: 'bg-blue-500'
        },
        {
            title: 'Produits',
            value: '89',
            change: '+2',
            positive: true,
            icon: Package,
            color: 'bg-indigo-500'
        },
        {
            title: 'Clients',
            value: '523',
            change: '+15.3%',
            positive: true,
            icon: Users,
            color: 'bg-purple-500'
        },
    ];

    const recentSales = [
        { id: 1, customer: 'Jean Dupont', product: 'iPhone 13 Pro', amount: '1,099 €', status: 'Complété' },
        { id: 2, customer: 'Marie Martin', product: 'MacBook Air', amount: '1,299 €', status: 'En cours' },
        { id: 3, customer: 'Pierre Bernard', product: 'AirPods Pro', amount: '279 €', status: 'Complété' },
        { id: 4, customer: 'Sophie Laurent', product: 'iPad Air', amount: '699 €', status: 'En cours' },
    ];

    const topProducts = [
        { id: 1, name: 'iPhone 13 Pro', sales: 156, revenue: '171,444 €' },
        { id: 2, name: 'MacBook Pro M2', sales: 89, revenue: '267,000 €' },
        { id: 3, name: 'AirPods Pro', sales: 234, revenue: '65,286 €' },
        { id: 4, name: 'iPad Air', sales: 112, revenue: '78,288 €' },
    ];

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Vue d'ensemble de votre activité</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option>7 derniers jours</option>
                        <option>30 derniers jours</option>
                        <option>Cette année</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.positive ? 'text-green-600' : 'text-rose-600'}`}>
                                    {stat.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
                            <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart Placeholder */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Revenus Mensuels</h3>
                        <TrendingUp className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border border-indigo-100">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TrendingUp className="w-8 h-8 text-indigo-600" />
                            </div>
                            <p className="text-slate-600 font-medium">Graphique à venir</p>
                            <p className="text-sm text-slate-400 mt-1">Fonctionnalité en développement</p>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Produits les Plus Vendus</h3>
                    <div className="space-y-3">
                        {topProducts.map((product, index) => (
                            <div key={product.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">{product.name}</p>
                                        <p className="text-xs text-slate-500">{product.sales} ventes</p>
                                    </div>
                                </div>
                                <p className="font-bold text-slate-900">{product.revenue}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Ventes Récentes</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="text-left py-3 px-4 text-sm font-bold text-slate-600">Client</th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-slate-600">Produit</th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-slate-600">Montant</th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-slate-600">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSales.map((sale) => (
                                <tr key={sale.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-slate-900">{sale.customer}</td>
                                    <td className="py-4 px-4 text-sm text-slate-600">{sale.product}</td>
                                    <td className="py-4 px-4 text-sm font-bold text-slate-900">{sale.amount}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${sale.status === 'Complété'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
