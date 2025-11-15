import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();
export const useAuth = () => { const context = useContext(AuthContext); if (!context) { throw new Error("useAuth harus digunakan dalam AuthProvider"); } return context; };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/me').then(response => { setUser(response.data); }).catch(() => { localStorage.removeItem('token'); }).finally(() => { setLoading(false); });
        } else { setLoading(false); }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            toast.success('Login berhasil!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login gagal!');
            return false;
        }
    };

    const logout = async () => {
        try { await api.post('/logout'); } catch (error) { console.error("Logout error", error); } finally {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
            toast.info('Anda telah logout.');
        }
    };

    return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};