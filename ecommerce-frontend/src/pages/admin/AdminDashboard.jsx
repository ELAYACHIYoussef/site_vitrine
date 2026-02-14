import React, { useState, useEffect } from 'react';
import {
    Package, ShoppingCart, Users, DollarSign, TrendingUp,
    Eye, ArrowUpRight, ArrowDownRight, RefreshCw, Boxes,
    BarChart3, Clock, Star
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { getDashboardStats } from '../../api/dashboardService';
import { getImageUrl } from '../../utils/imageUtils';

const BRAND_COLORS = {
    primary: '#e85d04',
    primaryLight: '#f48c06',
    primaryDark: '#dc2f02',
    dark: '#0f172a',
    darkCard: '#1e293b',
    accent: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
    purple: '#8b5cf6',
    pink: '#ec4899',
};

const PIE_COLORS = ['#e85d04', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);
            else setLoading(true);

            const data = await getDashboardStats();
            setStats(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
            setError('Impossible de charger les statistiques');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={styles.loadingText}>Chargement du tableau de bord...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p style={styles.errorText}>{error}</p>
                <button onClick={() => fetchStats()} style={styles.retryBtn}>Réessayer</button>
            </div>
        );
    }

    const { catalog, auth, orders } = stats;

    // Prepare chart data
    const categoryData = catalog.productsByCategory
        ? Object.entries(catalog.productsByCategory).map(([name, value]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            produits: value
        }))
        : [];

    const topViewedData = catalog.topViewed
        ? catalog.topViewed.map(p => ({
            name: p.name?.length > 12 ? p.name.substring(0, 12) + '...' : p.name,
            vues: p.views || 0
        }))
        : [];

    const kpiCards = [
        {
            title: 'Chiffre d\'Affaires',
            value: `${(orders?.totalRevenue || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`,
            icon: DollarSign,
            color: BRAND_COLORS.success,
            gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            subtitle: `${orders?.totalOrders || 0} commandes au total`,
        },
        {
            title: 'Utilisateurs',
            value: auth.totalUsers || 0,
            icon: Users,
            color: BRAND_COLORS.info,
            gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            subtitle: `${auth.clients || 0} client(s)`,
        },
        {
            title: 'Produits',
            value: catalog.totalProducts || 0,
            icon: Package,
            color: BRAND_COLORS.primary,
            gradient: 'linear-gradient(135deg, #e85d04 0%, #f48c06 100%)',
            subtitle: `${catalog.totalStock || 0} en stock`,
        },
        {
            title: 'Valeur Stock',
            value: `${(catalog.catalogValue || 0).toLocaleString('fr-FR', { minimumFractionDigits: 0 })} €`,
            icon: Boxes,
            color: BRAND_COLORS.purple,
            gradient: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
            subtitle: 'Catalog Value',
        },
    ];

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Tableau de Bord</h1>
                    <p style={styles.subtitle}>Vue d'ensemble de votre boutique AzyMarket</p>
                </div>
                <button
                    onClick={() => fetchStats(true)}
                    style={{
                        ...styles.refreshBtn,
                        ...(refreshing ? { opacity: 0.6, pointerEvents: 'none' } : {})
                    }}
                >
                    <RefreshCw size={16} style={refreshing ? { animation: 'spin 1s linear infinite' } : {}} />
                    {refreshing ? 'Actualisation...' : 'Actualiser'}
                </button>
            </div>

            {/* KPI Cards */}
            <div style={styles.kpiGrid}>
                {kpiCards.map((card, i) => (
                    <KPICard key={i} {...card} index={i} />
                ))}
            </div>

            {/* Charts Row */}
            <div style={styles.chartsRow}>
                {/* Products by Category - Pie Chart */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <BarChart3 size={20} style={{ color: BRAND_COLORS.primary }} />
                        <h3 style={styles.chartTitle}>Produits par Catégorie</h3>
                    </div>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    dataKey="produits"
                                    nameKey="name"
                                    stroke="none"
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#1e293b',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ color: '#94a3b8', fontSize: '13px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={styles.noData}>Aucune catégorie trouvée</div>
                    )}
                </div>

                {/* Top Viewed - Bar Chart */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <Eye size={20} style={{ color: BRAND_COLORS.info }} />
                        <h3 style={styles.chartTitle}>Produits les Plus Vus</h3>
                    </div>
                    {topViewedData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={topViewedData} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={{ stroke: '#334155' }}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={{ stroke: '#334155' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: '#1e293b',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: '#fff',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                                    }}
                                />
                                <Bar
                                    dataKey="vues"
                                    fill="url(#barGradient)"
                                    radius={[8, 8, 0, 0]}
                                />
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#e85d04" />
                                        <stop offset="100%" stopColor="#f48c06" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={styles.noData}>Aucune donnée de vues</div>
                    )}
                </div>
            </div>

            {/* Bottom Row - Recent Products + Recent Users */}
            <div style={styles.chartsRow}>
                {/* Recent Products */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <Clock size={20} style={{ color: BRAND_COLORS.accent }} />
                        <h3 style={styles.chartTitle}>Derniers Produits Ajoutés</h3>
                    </div>
                    <div style={styles.listContainer}>
                        {(catalog.recentProducts || []).map((product, i) => (
                            <div key={product.id} style={{
                                ...styles.listItem,
                                animationDelay: `${i * 0.1}s`
                            }}>
                                <div style={styles.listItemLeft}>
                                    {product.thumbnail ? (
                                        <img
                                            src={getImageUrl(product.thumbnail)}
                                            alt={product.name}
                                            style={styles.productThumb}
                                        />
                                    ) : (
                                        <div style={styles.productThumbPlaceholder}>
                                            <Package size={18} color="#94a3b8" />
                                        </div>
                                    )}
                                    <div>
                                        <p style={styles.listItemName}>{product.name}</p>
                                        <p style={styles.listItemSub}>
                                            {product.categoryLabel || product.category}
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.listItemRight}>
                                    <span style={styles.priceTag}>{product.price?.toFixed(2)} €</span>
                                    <span style={styles.stockBadge(product.stock)}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {(!catalog.recentProducts || catalog.recentProducts.length === 0) && (
                            <div style={styles.noData}>Aucun produit</div>
                        )}
                    </div>
                </div>

                {/* Recent Users */}
                <div style={styles.chartCard}>
                    <div style={styles.chartHeader}>
                        <Users size={20} style={{ color: BRAND_COLORS.success }} />
                        <h3 style={styles.chartTitle}>Derniers Inscrits</h3>
                    </div>
                    <div style={styles.listContainer}>
                        {(auth.recentUsers || []).map((user, i) => (
                            <div key={user.id} style={{
                                ...styles.listItem,
                                animationDelay: `${i * 0.1}s`
                            }}>
                                <div style={styles.listItemLeft}>
                                    <div style={styles.userAvatar(user.role)}>
                                        {user.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p style={styles.listItemName}>{user.username}</p>
                                        <p style={styles.listItemSub}>{user.email}</p>
                                    </div>
                                </div>
                                <span style={styles.roleBadge(user.role)}>
                                    {user.role === 'admin' ? '⭐ Admin' : 'Client'}
                                </span>
                            </div>
                        ))}
                        {(!auth.recentUsers || auth.recentUsers.length === 0) && (
                            <div style={styles.noData}>Aucun utilisateur</div>
                        )}
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
}

function KPICard({ title, value, icon: Icon, color, gradient, subtitle, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                ...kpiStyles.card,
                animation: `fadeInUp 0.5s ease ${index * 0.1}s both`,
                transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hovered
                    ? `0 20px 60px ${color}30, 0 0 0 1px ${color}20`
                    : '0 4px 24px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={kpiStyles.cardTop}>
                <div>
                    <p style={kpiStyles.label}>{title}</p>
                    <p style={kpiStyles.value}>{value}</p>
                </div>
                <div style={{
                    ...kpiStyles.iconBox,
                    background: gradient,
                    boxShadow: `0 8px 24px ${color}40`,
                }}>
                    <Icon size={24} color="#fff" />
                </div>
            </div>
            <p style={kpiStyles.subtitle}>{subtitle}</p>
        </div>
    );
}

const kpiStyles = {
    card: {
        background: '#1e293b',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    cardTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: {
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: '500',
        margin: 0,
        letterSpacing: '0.02em',
    },
    value: {
        color: '#f8fafc',
        fontSize: '32px',
        fontWeight: '700',
        margin: '8px 0 0 0',
        letterSpacing: '-0.02em',
    },
    iconBox: {
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    subtitle: {
        color: '#64748b',
        fontSize: '13px',
        margin: '12px 0 0 0',
        fontWeight: '400',
    },
};

const styles = {
    container: {
        padding: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '800',
        color: '#0f172a',
        margin: 0,
        letterSpacing: '-0.02em',
    },
    subtitle: {
        color: '#64748b',
        fontSize: '15px',
        margin: '4px 0 0 0',
    },
    refreshBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        color: '#475569',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    kpiGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '28px',
    },
    chartsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '28px',
    },
    chartCard: {
        background: '#0f172a',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.05)',
        animation: 'scaleIn 0.4s ease both',
    },
    chartHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    chartTitle: {
        color: '#f1f5f9',
        fontSize: '16px',
        fontWeight: '600',
        margin: 0,
    },
    noData: {
        color: '#64748b',
        textAlign: 'center',
        padding: '40px 0',
        fontSize: '14px',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 14px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        transition: 'all 0.2s',
        animation: 'fadeInUp 0.4s ease both',
    },
    listItemLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    listItemName: {
        color: '#f1f5f9',
        fontSize: '14px',
        fontWeight: '500',
        margin: 0,
    },
    listItemSub: {
        color: '#64748b',
        fontSize: '12px',
        margin: '2px 0 0 0',
    },
    listItemRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    productThumb: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        objectFit: 'cover',
        border: '1px solid rgba(255,255,255,0.1)',
    },
    productThumbPlaceholder: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceTag: {
        color: '#e85d04',
        fontWeight: '600',
        fontSize: '14px',
    },
    stockBadge: (stock) => ({
        padding: '4px 10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '500',
        background: stock > 3 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
        color: stock > 3 ? '#10b981' : '#ef4444',
    }),
    userAvatar: (role) => ({
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '16px',
        color: '#fff',
        background: role === 'admin'
            ? 'linear-gradient(135deg, #e85d04, #f48c06)'
            : 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    }),
    roleBadge: (role) => ({
        padding: '4px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '600',
        background: role === 'admin' ? 'rgba(232,93,4,0.15)' : 'rgba(59,130,246,0.15)',
        color: role === 'admin' ? '#e85d04' : '#3b82f6',
    }),
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '16px',
    },
    spinner: {
        width: '48px',
        height: '48px',
        border: '3px solid #e2e8f0',
        borderTop: '3px solid #e85d04',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    loadingText: {
        color: '#64748b',
        fontSize: '15px',
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '16px',
    },
    errorText: {
        color: '#ef4444',
        fontSize: '16px',
    },
    retryBtn: {
        padding: '10px 24px',
        borderRadius: '10px',
        border: 'none',
        background: '#e85d04',
        color: '#fff',
        fontWeight: '600',
        cursor: 'pointer',
    },
};

export default AdminDashboard;
