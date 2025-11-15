import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

const JadwalFormModal = ({ isOpen, onClose, jadwalData, onRefresh }) => {
    const [formData, setFormData] = useState({
        kegiatan: '',
        tanggal: '',
        waktu_mulai: '',
        waktu_selesai: '',
        tempat: '',
        keterangan: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (jadwalData) {
            setFormData(jadwalData);
            setIsEditing(true);
        } else {
            // Reset form
            setFormData({
                kegiatan: '',
                tanggal: '',
                waktu_mulai: '',
                waktu_selesai: '',
                tempat: '',
                keterangan: '',
            });
            setIsEditing(false);
        }
    }, [jadwalData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/jadwal/${formData.id}`, formData);
                toast.success('Jadwal berhasil diperbarui!');
            } else {
                await api.post('/jadwal', formData);
                toast.success('Jadwal berhasil ditambahkan!');
            }
            onRefresh(); // Refresh data di halaman utama
            onClose();   // Tutup modal
        } catch (error) {
            toast.error('Terjadi kesalahan.');
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{isEditing ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h2>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="kegiatan" value={formData.kegiatan} onChange={handleChange} placeholder="Nama Kegiatan" className="input-style" required />
                    <input name="tanggal" value={formData.tanggal} onChange={handleChange} type="date" className="input-style" required />
                    <div className="flex space-x-2">
                        <input name="waktu_mulai" value={formData.waktu_mulai} onChange={handleChange} type="time" className="input-style flex-1" required />
                        <input name="waktu_selesai" value={formData.waktu_selesai} onChange={handleChange} type="time" className="input-style flex-1" required />
                    </div>
                    <input name="tempat" value={formData.tempat} onChange={handleChange} placeholder="Tempat" className="input-style" required />
                    <textarea name="keterangan" value={formData.keterangan} onChange={handleChange} placeholder="Keterangan (opsional)" className="input-style" rows="3"></textarea>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JadwalFormModal;