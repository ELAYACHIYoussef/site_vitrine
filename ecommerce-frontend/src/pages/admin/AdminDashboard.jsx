import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowRight, Eye } from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';

const AdminDashboard = () => {
    // Mock data pour démonstration
    const stats = [
        { title: 'Total Products', value: '48', trend: '+12%', icon: Package, color: 'indigo' },
        { title: 'Total Orders', value: '124', trend: '+8%', icon: ShoppingCart, color: 'emerald' },
        { title: 'Total Customers', value: '1.2k', trend: '+15%', icon: Users, color: 'amber' },
        { title: 'Revenue Today', value: '€12,450', trend: '+23%', icon: DollarSign, color: 'rose' }
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: 'John Doe', product: 'iPhone 13 Pro', amount: '€1,099', status: 'Completed', date: '2h ago' },
        { id: '#ORD-002', customer: 'Jane Smith', product: 'MacBook Air', amount: '€1,299', status: 'Processing', date: '4h ago' },
        { id: '#ORD-003', customer: 'Bob Johnson', product: 'AirPods Pro', amount: '€249', status: 'Pending', date: '6h ago' },
        { id: '#ORD-004', customer: 'Alice Brown', product: 'iPad Pro', amount: '€899', status: 'Completed', date: '8h ago' },
    ];

    const topProducts = [
        { name: 'iPhone 13 Pro', sales: 45, revenue: '€49,455', trend: '+12%' },
        { name: 'MacBook Air', sales: 32, revenue: '€41,568', trend: '+8%' },
        { name: 'AirPods Pro', sales: 67, revenue: '€16,683', trend: '+25%' },
        { name: 'iPad Pro', sales: 28, revenue: '€25,172', trend: '+5%' },
    ];

    const statusColors = {
        'Completed': 'bg-emerald-100 text-emerald-700',
        'Processing': 'bg-amber-100 text-amber-700',
        'Pending': 'bg-slate-100 text-slate-700',
        'Cancelled': 'bg-red-100 text-red-700'
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Charts & Top Products */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Revenue Overview</h2>
                            <p className="text-slate-600 text-sm mt-1">Monthly revenue trends</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-semibold">+18.2%</span>
                        </div>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300">
                        <div className="text-center">
                            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-600 font-medium">Chart visualization here</p>
                            <p className="text-slate-500 text-sm mt-1">Recharts integration coming soon</p>
                        </div>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Top Products</h2>
                            <p className="text-slate-600 text-sm mt-1">Best selling items</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm text-slate-600">{product.sales} sold</span>
                                        <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                                            {product.trend}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">{product.revenue}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold flex items-center justify-center gap-2 hover:gap-3 transition-all">
                        View All Products
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
                        <p className="text-slate-600 text-sm mt-1">Latest customer orders</p>
                    </div>
                    <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
                        View All
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Order ID</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Product</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4">
                                        <span className="font-mono text-sm font-semibold text-slate-900">{order.id}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-slate-700 font-medium">{order.customer}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-slate-600">{order.product}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="font-semibold text-slate-900">{order.amount}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-slate-600 text-sm">{order.date}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                            <Eye className="w-4 h-4 text-slate-600" />
                                        </button>
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
