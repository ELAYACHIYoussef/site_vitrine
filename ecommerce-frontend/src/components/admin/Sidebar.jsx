import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    ChevronRight,
    ChevronDown,
    LogOut,
    Menu,
    X,
    Layers,
    Plus,
    List
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState(['products']);

    const toggleMenu = (menuId) => {
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const isActive = (path) => location.pathname === path;
    const isMenuActive = (paths) => paths.some(path => location.pathname.startsWith(path));

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin',
            exact: true
        },
        {
            id: 'products',
            label: 'Products',
            icon: Package,
            badge: '12',
            subItems: [
                { label: 'All Products', path: '/admin/products', icon: List },
                { label: 'Add Product', path: '/admin/products/new', icon: Plus },
                { label: 'Categories', path: '/admin/categories', icon: Layers }
            ]
        },
        {
            id: 'orders',
            label: 'Orders',
            icon: ShoppingCart,
            badge: '5',
            subItems: [
                { label: 'All Orders', path: '/admin/orders' },
                { label: 'Order Details', path: '/admin/orders/details' }
            ]
        },
        {
            id: 'customers',
            label: 'Customers',
            icon: Users,
            path: '/admin/customers'
        },
        {
            id: 'analytics',
            label: 'Analytics',
            icon: BarChart3,
            path: '/admin/analytics'
        },
        {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            path: '/admin/settings'
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar - AzyMarket Brand Colors */}
            <aside className={`
                fixed left-0 top-0 h-screen 
                bg-gradient-to-b from-[#0f2942] via-[#1a3a52] to-[#0f2942]
                border-r border-[#FF6835]/20 
                z-50 transition-all duration-300 ease-in-out
                ${isOpen ? 'w-72' : 'w-0 lg:w-20'}
                overflow-hidden
            `}>
                <div className="flex flex-col h-full">
                    {/* Header with Logo */}
                    <div className="p-6 border-b border-[#FF6835]/20">
                        <div className="flex items-center justify-between">
                            {isOpen && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6835] to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/50">
                                        <span className="text-white font-bold text-xl">A</span>
                                    </div>
                                    <div>
                                        <h1 className="text-white font-bold text-lg">AzyMarket</h1>
                                        <p className="text-slate-400 text-xs">Admin Panel</p>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg bg-[#1a3a52] hover:bg-[#FF6835]/20 text-slate-400 hover:text-[#FF6835] transition-all lg:hidden"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-[#FF6835]/30 scrollbar-track-transparent">
                        {menuItems.map((item) => (
                            <div key={item.id}>
                                {/* Main Item */}
                                {item.subItems ? (
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`
                                            w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                                            ${isMenuActive([item.subItems[0]?.path])
                                                ? 'bg-gradient-to-r from-[#FF6835] to-orange-600 text-white shadow-lg shadow-orange-500/50'
                                                : 'text-slate-400 hover:bg-[#1a3a52] hover:text-white'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            {isOpen && (
                                                <>
                                                    <span className="font-medium">{item.label}</span>
                                                    {item.badge && (
                                                        <span className="px-2 py-0.5 text-xs rounded-full bg-[#FF6835] text-white">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        {isOpen && (
                                            expandedMenus.includes(item.id)
                                                ? <ChevronDown className="w-4 h-4" />
                                                : <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`
                                            flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                                            ${isActive(item.path)
                                                ? 'bg-gradient-to-r from-[#FF6835] to-orange-600 text-white shadow-lg shadow-orange-500/50'
                                                : 'text-slate-400 hover:bg-[#1a3a52] hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {isOpen && <span className="font-medium">{item.label}</span>}
                                    </Link>
                                )}

                                {/* Sub Items */}
                                {item.subItems && expandedMenus.includes(item.id) && isOpen && (
                                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-[#FF6835]/30 pl-4">
                                        {item.subItems.map((subItem, idx) => (
                                            <Link
                                                key={idx}
                                                to={subItem.path}
                                                className={`
                                                    flex items-center gap-2 p-2 rounded-lg text-sm transition-all duration-200
                                                    ${isActive(subItem.path)
                                                        ? 'bg-[#1a3a52] text-[#FF6835] font-medium'
                                                        : 'text-slate-400 hover:bg-[#1a3a52] hover:text-white'
                                                    }
                                                `}
                                            >
                                                {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                                <span>{subItem.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Footer - Logout */}
                    <div className="p-4 border-t border-[#FF6835]/20">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            {isOpen && <span className="font-medium">Log Out</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Toggle Button for Desktop (collapsed mode) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="hidden lg:block fixed left-20 top-6 p-2 rounded-lg bg-[#1a3a52] hover:bg-[#FF6835] text-slate-400 hover:text-white transition-all z-40"
                >
                    <Menu className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default Sidebar;
