import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, UserGroupIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-gray-600">Selamat datang di Sistem Monitoring Posyandu Desa.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Link to="/balita" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <UsersIcon className="h-8 w-8 text-blue-500 mb-2"/>
                    <h3 className="text-lg font-semibold text-gray-700">Data Balita</h3>
                    <p className="text-gray-500">Kelola data pertumbuhan dan perkembangan balita.</p>
                </Link>
                <Link to="/ibu-hamil" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <UserGroupIcon className="h-8 w-8 text-pink-500 mb-2"/>
                    <h3 className="text-lg font-semibold text-gray-700">Data Ibu Hamil</h3>
                    <p className="text-gray-500">Pantau kesehatan ibu hamil di desa.</p>
                </Link>
                <Link to="/pengaduan" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
                    <CalendarDaysIcon className="h-8 w-8 text-green-500 mb-2"/>
                    <h3 className="text-lg font-semibold text-gray-700">Pengaduan</h3>
                    <p className="text-gray-500">Tanggapi pengaduan dari masyarakat.</p>
                </Link>
            </div>
        </div>
    );
};
export default DashboardPage;