import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // IMPORT LINK
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // IMPORT IKON PANAH

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login({ email, password });
        if (success) {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Login Kader Posyandu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="email"
                            type="email"
                            placeholder="Email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="password"
                            type="password"
                            placeholder="Password Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Masuk
                        </button>
                    </div>
                </form>
                
                {/* TAMBAHKAN TOMBOL KEMBALI INI */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-1" />
                        Kembali ke Beranda Publik
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;