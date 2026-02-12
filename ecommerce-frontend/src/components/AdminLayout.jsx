import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './admin/Sidebar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

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
