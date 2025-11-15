import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import BalitaFormModal from '../components/BalitaFormModal';

const DataBalitaPage = () => {
    const [balitas, setBalitas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBalita, setSelectedBalita] = useState(null);

    useEffect(() => { fetchBalitas(); }, [searchTerm]);

    const fetchBalitas = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/balita?search=${searchTerm}`);
            setBalitas(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data balita:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await api.delete(`/balita/${id}`);
                toast.success('Data berhasil dihapus!');
            
                // OPTIMASI: Perbarui state secara langsung
                setBalitas(currentBalitas => currentBalitas.filter(balita => balita.id !== id));
            
            } catch (error) {
                toast.error('Gagal menghapus data.');
                // Jika gagal, refresh data untuk sinkronisasi ulang
                fetchBalitas();
            }
        }
    };

    const openAddModal = () => { setSelectedBalita(null); setIsModalOpen(true); };
    const openEditModal = (balita) => { setSelectedBalita(balita); setIsModalOpen(true); };

    // FUNGSI UNTUK MEMFORMAT TANGGAL
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Data Balita</h1>
                <button onClick={openAddModal} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <PlusIcon className="w-5 h-5 mr-2" /> Tambah Balita
                </button>
            </div>
            <div className="relative mb-6">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cari berdasarkan nama balita atau orang tua..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            {loading ? (<p>Memuat data...</p>) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* HEADER TABEL DISEDERHANAKAN */}
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIK</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Orang Tua</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        {/* BODY TABEL DISEDERHANAKAN */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {balitas.map((balita) => (
                                <tr key={balita.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{balita.nama_lengkap}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{balita.nik}</td>
                                    {/* TANGGAL DIFORMAT DISINI */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(balita.tanggal_lahir)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{balita.nama_ortu}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => openEditModal(balita)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(balita.id)} className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <BalitaFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} balitaData={selectedBalita} onRefresh={fetchBalitas} />
        </div>
    );
};

export default DataBalitaPage;