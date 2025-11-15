import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomeIcon, UsersIcon, CalendarDaysIcon, UserGroupIcon, ChatBubbleLeftRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 text-2xl font-bold text-green-600">
                    Posyandu App
                </div>
                <nav className="mt-4">
                    {/* TAMBAHKAN /admin PADA SEMUA LINK DI BAWAH INI */}
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <HomeIcon className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/admin/balita" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <UsersIcon className="w-5 h-5 mr-3" />
                        Data Balita
                    </Link>
                    <Link to="/admin/ibu-hamil" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <UserGroupIcon className="w-5 h-5 mr-3" />
                        Data Ibu Hamil
                    </Link>
                    <Link to="/admin/jadwal" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <CalendarDaysIcon className="w-5 h-5 mr-3" />
                        Jadwal
                    </Link>
                    <Link to="/admin/pengaduan" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 mr-3" />
                        Pengaduan
                    </Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin/manajemen-user" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
                            <UsersIcon className="w-5 h-5 mr-3" />
                            Manajemen User
                        </Link>
                    )}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Selamat datang, {user?.name}</h1>
                    <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;