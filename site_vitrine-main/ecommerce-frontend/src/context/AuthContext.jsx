import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const userData = localStorage.getItem('user');
            return userData && userData !== 'undefined' ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await authService.login(email, password);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setToken(token);
            setUser(user);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => !!token;
    const isAdmin = () => user?.role === 'admin';

    const deleteAccount = async () => {
        try {
            await authService.deleteAccount();
            logout();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || 'Erreur lors de la suppression' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, deleteAccount, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
