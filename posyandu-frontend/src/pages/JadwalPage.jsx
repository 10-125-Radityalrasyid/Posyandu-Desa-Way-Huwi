import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { CalendarDaysIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import JadwalFormModal from '../components/JadwalFormModal';

const JadwalPage = () => {
    const [jadwals, setJadwals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);

    const fetchJadwals = async () => {
        setLoading(true);
        try {
            const response = await api.get('/jadwal');
            setJadwals(response.data);
        } catch (error) {
            console.error("Gagal mengambil data jadwal:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchJadwals();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Hapus jadwal ini?')) {
            try {
                await api.delete(`/jadwal/${id}`);
                toast.success('Jadwal dihapus');
                fetchJadwals();
            } catch {
                toast.error('Gagal hapus');
            }
        }
    };

    const openAddModal = () => {
        setSelectedJadwal(null);
        setIsModalOpen(true);
    };

    const openEditModal = (j) => {
        setSelectedJadwal(j);
        setIsModalOpen(true);
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Jadwal Posyandu</h1>
                <button onClick={openAddModal} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    <PlusIcon className="w-5 h-5 mr-2" /> Tambah Jadwal
                </button>
            </div>
            {loading ? (<p>Memuat jadwal...</p>) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jadwals.map((j) => (
                        <div key={j.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg flex items-center">
                                        <CalendarDaysIcon className="w-6 h-6 text-green-500 mr-2" />
                                        {j.kegiatan}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-2">{new Date(j.tanggal).toLocaleDateString('id-ID')}</p>
                                    <p className="text-gray-600 text-sm">Pukul {j.waktu_mulai} - {j.waktu_selesai}</p>
                                    <p className="text-gray-600 text-sm">Tempat: {j.tempat}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => openEditModal(j)} className="text-indigo-600 hover:text-indigo-900">
                                        <PencilIcon className="w-5 h-5"/>
                                    </button>
                                    <button onClick={() => handleDelete(j.id)} className="text-red-600 hover:text-red-900">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <JadwalFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jadwalData={selectedJadwal}
                onRefresh={fetchJadwals}
            />
        </div>
    );
};

export default JadwalPage;