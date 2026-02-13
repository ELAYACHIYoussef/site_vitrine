import React from 'react';
import { BarChart3, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

const KPICard = ({ title, value, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
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
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Analytiques</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <KPICard
                    title="Revenu Mensuel"
                    value="12,450.00 €"
                    trend="+12%"
                    icon={DollarSign}
                    color="text-indigo-600 bg-indigo-600"
                />
                <KPICard
                    title="Commandes"
                    value="156"
                    trend="+5%"
                    icon={ShoppingBag}
                    color="text-orange-600 bg-orange-600"
                />
                <KPICard
                    title="Taux de Conversion"
                    value="3.2%"
                    trend="+0.4%"
                    icon={BarChart3}
                    color="text-blue-600 bg-blue-600"
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
