import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE = 'http://localhost:8080/api/catalog/instagram';

export default function InstagramSyncPanel() {
    const { token } = useAuth();
    const [status, setStatus] = useState({ connected: false, loading: true });
    const [connecting, setConnecting] = useState(false);
    const [usernameInput, setUsernameInput] = useState('@azyymarket');
    const [syncingProductId, setSyncingProductId] = useState(null);

    const fetchStatus = async () => {
        try {
            const res = await fetch(`${API_BASE}/status`);
            const data = await res.json();
            setStatus({ ...data, loading: false });
        } catch {
            setStatus({ connected: false, loading: false });
        }
    };

    useEffect(() => { fetchStatus(); }, []);

    const handleConnect = async () => {
        setConnecting(true);
        try {
            const res = await fetch(`${API_BASE}/connect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ username: usernameInput })
            });
            const data = await res.json();
            setStatus({ ...data, loading: false });
            toast.success(`✅ Instagram connecté : ${data.username}`);
        } catch {
            toast.error('Erreur lors de la connexion Instagram');
        } finally {
            setConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        setConnecting(true);
        try {
            const res = await fetch(`${API_BASE}/disconnect`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setStatus({ connected: false, loading: false });
            toast.success('Compte Instagram déconnecté');
        } catch {
            toast.error('Erreur lors de la déconnexion');
        } finally {
            setConnecting(false);
        }
    };

    const [syncing, setSyncing] = useState(false);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch(`http://localhost:8080/api/catalog/instagram/sync`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            toast.success(`✅ Synchronisation terminée : ${data.imported} nouveaux produits, ${data.updated} mis à jour`);
            fetchStatus();
        } catch (e) {
            toast.error('Erreur lors de la synchronisation bidirectionnelle');
        } finally {
            setSyncing(false);
        }
    };

    if (status.loading) {
        return (
            <div className="instagram-panel loading">
                <div className="ig-spinner" />
                <span>Chargement du statut Instagram...</span>
            </div>
        );
    }

    return (
        <div className="instagram-panel">
            {/* Header */}
            <div className="ig-header">
                <div className="ig-logo-wrap">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ig-logo">
                        <defs>
                            <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f09433" />
                                <stop offset="25%" stopColor="#e6683c" />
                                <stop offset="50%" stopColor="#dc2743" />
                                <stop offset="75%" stopColor="#cc2366" />
                                <stop offset="100%" stopColor="#bc1888" />
                            </linearGradient>
                        </defs>
                        <rect width="24" height="24" rx="7" fill="url(#igGrad)" />
                        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" />
                        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                        <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none" />
                    </svg>
                </div>
                <div>
                    <h3 className="ig-title">Instagram Sync</h3>
                    <p className="ig-subtitle">
                        {status.connected
                            ? <><span className="ig-dot connected" /> Connecté comme <b>{status.username || '@azyymarket'}</b></>
                            : <><span className="ig-dot disconnected" /> Non connecté</>}
                    </p>
                </div>
                {status.connected && (
                    <span className="ig-badge connected">🟢 Actif</span>
                )}
            </div>

            {/* Stats - shown when connected */}
            {status.connected && (
                <div className="ig-stats">
                    <div className="ig-stat-card">
                        <span className="ig-stat-value">{status.followers?.toLocaleString() ?? '—'}</span>
                        <span className="ig-stat-label">Abonnés</span>
                    </div>
                    <div className="ig-stat-card">
                        <span className="ig-stat-value">{status.following ?? '—'}</span>
                        <span className="ig-stat-label">Abonnements</span>
                    </div>
                    <div className="ig-stat-card">
                        <span className="ig-stat-value">{status.posts ?? '—'}</span>
                        <span className="ig-stat-label">Publications</span>
                    </div>
                </div>
            )}

            {/* Sync flow info */}
            <div className="ig-flow">
                <div className="ig-flow-item">
                    <div className="ig-flow-icon">📸</div>
                    <div className="ig-flow-label">Instagram</div>
                </div>
                <div className="ig-flow-arrow flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 mb-1">Bidirectionnel</span>
                    <span>⟷</span>
                </div>
                <div className="ig-flow-item">
                    <div className="ig-flow-icon">🛍️</div>
                    <div className="ig-flow-label">Votre Boutique</div>
                </div>
            </div>

            {/* Connect / Disconnect */}
            {!status.connected ? (
                <div className="ig-connect-form">
                    <input
                        className="ig-input"
                        type="text"
                        value={usernameInput}
                        onChange={e => setUsernameInput(e.target.value)}
                        placeholder="@votre_compte"
                    />
                    <button
                        className="ig-btn connect"
                        onClick={handleConnect}
                        disabled={connecting}
                    >
                        {connecting ? '⏳ Connexion...' : '📲 Connecter Instagram'}
                    </button>
                    <p className="ig-note">
                        🔒 Simulation sécurisée — aucune donnée Instagram réelle n'est envoyée.
                    </p>
                </div>
            ) : (
                <div className="ig-connected-actions space-y-3">
                    <button
                        className={`ig-btn sync w-full flex items-center justify-center gap-2 ${syncing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleSync}
                        disabled={syncing}
                    >
                        {syncing ? (
                            <>
                                <div className="ig-spinner-sm" />
                                Synchronisation...
                            </>
                        ) : (
                            <>🔄 Synchroniser maintenant</>
                        )}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                        <a
                            href={`https://www.instagram.com/${(status.username || 'azyymarket').replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ig-btn view text-center py-2 text-sm"
                        >
                            👁️ Voir le profil
                        </a>
                        <button
                            className="ig-btn disconnect text-sm"
                            onClick={handleDisconnect}
                            disabled={connecting}
                        >
                            {connecting ? '⏳...' : '🔌 Déconnecter'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
