import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './admin/Sidebar';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { isAuthenticated, isAdmin } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Redirect to login if not authenticated or not admin
    if (!isAuthenticated() || !isAdmin()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className={`
                transition-all duration-300
                ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
            `}>
                <div className="min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

