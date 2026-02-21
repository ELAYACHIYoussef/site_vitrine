import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Filter, Eye, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../../api/orderService';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '../../hooks/animations';

const BRAND_COLORS = {
    primary: '#e85d04',
    dark: '#0f172a',
    card: '#1e293b',
    text: '#94a3b8',
    white: '#f8fafc',
    border: 'rgba(255,255,255,0.05)'
};

const STATUS_CONFIG = {
    PENDING: { color: '#fbbf24', icon: Clock, label: 'En attente' },
    VALIDATED: { color: '#3b82f6', icon: CheckCircle, label: 'Validée' },
    SHIPPED: { color: '#8b5cf6', icon: Truck, label: 'Expédiée' },
    DELIVERED: { color: '#10b981', icon: CheckCircle, label: 'Livrée' },
    CANCELLED: { color: '#ef4444', icon: XCircle, label: 'Annulée' }
};

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            // Sort by date desc
            const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sorted);
        } catch (error) {
            console.error("Erreur chargement commandes", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateOrderStatus(id, newStatus);
            fetchOrders(); // Refresh
        } catch (error) {
            console.error("Erreur mise à jour statut", error);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filter === 'ALL' || order.status === filter;
        const matchesSearch =
            order.id.toString().includes(searchTerm) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (loading) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.loadingContainer}
        >
            <div style={styles.spinner} />
            <p style={{ color: BRAND_COLORS.text }}>Chargement des commandes...</p>
        </motion.div>
    );

    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            style={styles.container}
        >
            {/* Header */}
            <motion.div variants={fadeInUp} style={styles.header}>
                <div>
                    <h1 style={styles.title}>Gestion des Commandes</h1>
                    <p style={styles.subtitle}>{orders.length} commandes totales</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.exportBtn}
                >
                    Exporter CSV
                </motion.button>
            </motion.div>

            {/* Filters & Search */}
            <motion.div variants={fadeInUp} style={styles.toolbar}>
                <div style={styles.searchBox}>
                    <Search size={18} color={BRAND_COLORS.text} />
                    <input
                        type="text"
                        placeholder="Rechercher (ID, Nom, Email)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.filterGroup}>
                    <Filter size={18} color={BRAND_COLORS.text} />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={styles.select}
                    >
                        <option value="ALL">Tous les statuts</option>
                        {Object.keys(STATUS_CONFIG).map(status => (
                            <option key={status} value={status}>{STATUS_CONFIG[status].label}</option>
                        ))}
                    </select>
                </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div variants={scaleIn} style={styles.tableCard}>
                <div style={styles.tableHeader}>
                    <div style={{ ...styles.col, width: '10%' }}>ID</div>
                    <div style={{ ...styles.col, width: '25%' }}>Client</div>
                    <div style={{ ...styles.col, width: '15%' }}>Date</div>
                    <div style={{ ...styles.col, width: '15%' }}>Total</div>
                    <div style={{ ...styles.col, width: '20%' }}>Statut</div>
                    <div style={{ ...styles.col, width: '15%', textAlign: 'right' }}>Actions</div>
                </div>

                <div style={styles.tableBody}>
                    <AnimatePresence>
                        {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
                            <motion.div
                                variants={staggerItem}
                                layout
                                key={order.id}
                                style={styles.row}
                            >
                                <div style={{ ...styles.col, width: '10%', fontWeight: '600', color: BRAND_COLORS.white }}>
                                    #{order.id}
                                </div>
                                <div style={{ ...styles.col, width: '25%' }}>
                                    <div style={{ fontWeight: '500', color: BRAND_COLORS.white }}>{order.customerName}</div>
                                    <div style={{ fontSize: '12px', color: BRAND_COLORS.text }}>{order.customerEmail}</div>
                                </div>
                                <div style={{ ...styles.col, width: '15%', color: BRAND_COLORS.text }}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                                <div style={{ ...styles.col, width: '15%', fontWeight: '600', color: BRAND_COLORS.primary }}>
                                    {order.totalAmount.toFixed(2)} €
                                </div>
                                <div style={{ ...styles.col, width: '20%' }}>
                                    <StatusBadge status={order.status} />
                                </div>
                                <div style={{ ...styles.col, width: '15%', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                    <Link to={`/admin/orders/${order.id}`} style={styles.actionBtn}>
                                        <Eye size={16} />
                                    </Link>
                                    {/* Simuler changement statut pour demo */}
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        style={styles.miniSelect}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {Object.keys(STATUS_CONFIG).map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>
                        )) : (
                            <motion.div
                                key="no-data"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={styles.noData}
                            >
                                Aucune commande trouvée
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
    const Icon = config.icon;

    return (
        <span style={{
            ...styles.badge,
            background: `${config.color}20`,
            color: config.color,
            border: `1px solid ${config.color}40`
        }}>
            <Icon size={12} />
            {config.label}
        </span>
    );
};

const styles = {
    container: {
        padding: '32px',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: "'Inter', sans-serif",
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
        color: BRAND_COLORS.dark,
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        fontSize: '15px',
        margin: '4px 0 0 0',
    },
    exportBtn: {
        padding: '10px 20px',
        borderRadius: '12px',
        border: `1px solid #e2e8f0`,
        background: '#fff',
        color: '#475569',
        fontWeight: '500',
        cursor: 'pointer',
    },
    toolbar: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        padding: '10px 16px',
        borderRadius: '12px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        width: '100%',
        background: 'transparent',
    },
    filterGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        padding: '10px 16px',
        borderRadius: '12px',
    },
    select: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        cursor: 'pointer',
    },
    tableCard: {
        background: BRAND_COLORS.card,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${BRAND_COLORS.border}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        display: 'flex',
        padding: '16px 24px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: `1px solid ${BRAND_COLORS.border}`,
        color: BRAND_COLORS.text,
        fontSize: '13px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    tableBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: `1px solid ${BRAND_COLORS.border}`,
        transition: 'background 0.2s',
        animation: 'fadeIn 0.3s ease both',
    },
    col: {
        // defined in JSX
    },
    badge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '99px',
        fontSize: '12px',
        fontWeight: '600',
    },
    actionBtn: {
        padding: '6px',
        borderRadius: '8px',
        border: 'none',
        background: 'rgba(255,255,255,0.1)',
        color: BRAND_COLORS.text,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    miniSelect: {
        padding: '4px',
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.05)',
        color: BRAND_COLORS.white,
        border: 'none',
        fontSize: '11px',
    },
    noData: {
        padding: '40px',
        textAlign: 'center',
        color: BRAND_COLORS.text,
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        gap: '16px',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '3px solid #e2e8f0',
        borderTop: `3px solid ${BRAND_COLORS.primary}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
};

// Add styles/keyframes if not globally present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);
