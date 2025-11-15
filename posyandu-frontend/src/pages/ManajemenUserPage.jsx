import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { UserPlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ManajemenUserPage = () => {
    const [users, setUsers] = useState([]); const [form, setForm] = useState({ name: '', email: '', password: '' }); const [loading, setLoading] = useState(false);
    useEffect(() => { api.get('/users/kader').then(res => setUsers(res.data)); }, []);
    const handleAddUser = async (e) => { e.preventDefault(); setLoading(true); try { await api.post('/users/kader', form); toast.success('Akun kader berhasil ditambahkan!'); setForm({ name: '', email: '', password: '' }); api.get('/users/kader').then(res => setUsers(res.data)); } catch (error) { toast.error('Gagal menambahkan user.'); } finally { setLoading(false); } };
    const handleDelete = async (id) => { if (window.confirm('Hapus user ini?')) { try { await api.delete(`/users/${id}`); toast.success('User berhasil dihapus.'); api.get('/users/kader').then(res => setUsers(res.data)); } catch (error) { toast.error(error.response?.data?.message || 'Gagal menghapus user.'); } } };
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Pengguna (Kader)</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center"><UserPlusIcon className="w-6 h-6 mr-2 text-green-600" />Tambah Akun Kader Baru</h2>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama Lengkap" className="input-style" required />
                        <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" className="input-style" required />
                        <input name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="input-style" required />
                        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400">{loading ? 'Menyimpan...' : 'Tambah User'}</button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Daftar Akun Kader</h2>
                    <div className="space-y-3">{users.map(user => (<div key={user.id} className="flex justify-between items-center p-3 border rounded-lg"><div><p className="font-medium">{user.name}</p><p className="text-sm text-gray-500">{user.email}</p></div><button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-5 h-5" /></button></div>))}</div>
                </div>
            </div>
        </div>
    );
};
export default ManajemenUserPage;