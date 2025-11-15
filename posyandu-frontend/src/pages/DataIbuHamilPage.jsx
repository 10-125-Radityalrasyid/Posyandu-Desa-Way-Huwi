import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import IbuHamilFormModal from '../components/IbuHamilFormModal';

const DataIbuHamilPage = () => {
    const [ibuHamil, setIbuHamil] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIbuHamil, setSelectedIbuHamil] = useState(null);

    useEffect(() => { fetchIbuHamil(); }, [searchTerm]);

    const fetchIbuHamil = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/ibu-hamil?search=${searchTerm}`);
            setIbuHamil(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data ibu hamil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await api.delete(`/ibu-hamil/${id}`);
                fetchIbuHamil();
                toast.success('Data berhasil dihapus!');
            } catch (error) {
                toast.error('Gagal menghapus data.');
            }
        }
    };

    const openAddModal = () => { setSelectedIbuHamil(null); setIsModalOpen(true); };
    const openEditModal = (ibu) => { setSelectedIbuHamil(ibu); setIsModalOpen(true); };

    // FUNGSI UNTUK MEMFORMAT TANGGAL
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Data Ibu Hamil</h1>
                <button onClick={openAddModal} className="flex items-center bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                    <PlusIcon className="w-5 h-5 mr-2" /> Tambah Ibu Hamil
                </button>
            </div>
            <div className="relative mb-6">
                <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Cari berdasarkan nama ibu hamil..."
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usia Kehamilan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        {/* BODY TABEL DISEDERHANAKAN */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {ibuHamil.map((ibu) => (
                                <tr key={ibu.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ibu.nama_lengkap}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ibu.nik}</td>
                                    {/* TANGGAL DIFORMAT DISINI */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(ibu.tanggal_lahir)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ibu.usia_kehamilan} minggu</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => openEditModal(ibu)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(ibu.id)} className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <IbuHamilFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ibuHamilData={selectedIbuHamil} onRefresh={fetchIbuHamil} />
        </div>
    );
};

export default DataIbuHamilPage;