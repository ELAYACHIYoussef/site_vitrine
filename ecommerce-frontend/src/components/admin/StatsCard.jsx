import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, trend, icon: Icon, color = 'indigo', bgPattern = 'gradient' }) => {
    const colorVariants = {
        indigo: {
            bg: 'from-indigo-600 to-purple-600',
            shadow: 'shadow-indigo-500/50',
            icon: 'bg-white/20'
        },
        emerald: {
            bg: 'from-emerald-600 to-teal-600',
            shadow: 'shadow-emerald-500/50',
            icon: 'bg-white/20'
        },
        amber: {
            bg: 'from-amber-600 to-orange-600',
            shadow: 'shadow-amber-500/50',
            icon: 'bg-white/20'
        },
        rose: {
            bg: 'from-rose-600 to-pink-600',
            shadow: 'shadow-rose-500/50',
            icon: 'bg-white/20'
        }
    };

    const colors = colorVariants[color] || colorVariants.indigo;
    const isPositive = trend?.startsWith('+');

    return (
        <div className={`
            group relative overflow-hidden
            bg-gradient-to-br ${colors.bg} 
            p-6 rounded-2xl shadow-xl ${colors.shadow}
            hover:shadow-2xl hover:scale-105 
            transition-all duration-300
        `}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }} />
            </div>

            {/* Content */}
            <div className="relative">
                {/* Top Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colors.icon} backdrop-blur`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/30' : 'bg-red-500/30'} backdrop-blur`}>
                            {isPositive ? (
                                <TrendingUp className="w-4 h-4 text-white" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-white" />
                            )}
                            <span className="text-white text-sm font-semibold">{trend}</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div>
                    <h3 className="text-white/80 text-sm font-medium mb-1">{title}</h3>
                    <p className="text-white text-3xl font-bold">{value}</p>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        </div>
    );
};

export default StatsCard;
