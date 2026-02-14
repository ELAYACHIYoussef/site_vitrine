import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';
import { catalogService } from '../../api';
import { customerService } from '../../api/customerService';
import { toast } from 'react-hot-toast';

const KPICard = ({ title, value, trend, icon: Icon, color, loading }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
        {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )}
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <span className="flex items-center text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
);

const Analytics = () => {
    const [stats, setStats] = useState({
        revenue: '0.00',
        orders: 0,
        conversionRate: '0.0',
        loading: true
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch catalog stats for views
                const catalogStatsResponse = await catalogService.getStats();
                const totalViews = catalogStatsResponse.data.totalViews || 0;

                // Fetch all orders
                const orders = await customerService.getAllOrders();

                // Calculate monthly revenue
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const currentMonthOrders = orders.filter(order => {
                    const orderDate = new Date(order.createdAt);
                    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                });

                const monthlyRevenue = currentMonthOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                // Calculate conversion rate (Orders / Views)
                const conversionRate = totalViews > 0 ? (orders.length / totalViews * 100) : 0;

                setStats({
                    revenue: monthlyRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    orders: orders.length,
                    conversionRate: conversionRate.toFixed(1),
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching analytics:", error);
                toast.error("Erreur lors du chargement des analytiques");
                setStats(prev => ({ ...prev, loading: false }));
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Analytiques</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <KPICard
                    title="Revenu Mensuel"
                    value={`${stats.revenue} €`}
                    trend="+12%" // Mantaining trend icons for UI aesthetics, though hardcoded for now
                    icon={DollarSign}
                    color="text-indigo-600 bg-indigo-600"
                    loading={stats.loading}
                />
                <KPICard
                    title="Commandes"
                    value={stats.orders}
                    trend="+5%"
                    icon={ShoppingBag}
                    color="text-orange-600 bg-orange-600"
                    loading={stats.loading}
                />
                <KPICard
                    title="Taux de Conversion"
                    value={`${stats.conversionRate}%`}
                    trend="+0.4%"
                    icon={BarChart3}
                    color="text-blue-600 bg-blue-600"
                    loading={stats.loading}
                />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center py-20">
                <BarChart3 className="w-20 h-20 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Rapports Détaillés (Bientôt)</h3>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                    Nous travaillons sur des graphiques avancés pour visualiser vos ventes, votre trafic et le comportement de vos clients.
                </p>
            </div>
        </div>
    );
};

export default Analytics;
