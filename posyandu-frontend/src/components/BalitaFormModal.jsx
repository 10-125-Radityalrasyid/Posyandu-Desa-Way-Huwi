import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BalitaFormModal = ({ isOpen, onClose, balitaData, onRefresh }) => {
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        nik: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        nama_ortu: '',
        alamat: '',
        berat_lahir: '',
        tinggi_lahir: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (balitaData) {
            // MEMOTONG TANGGAL SEBELUM DIMASUKKAN KE STATE
            const processedData = {
                ...balitaData,
                // Ambil 10 karakter pertama dari string tanggal (YYYY-MM-DD)
                tanggal_lahir: balitaData.tanggal_lahir ? balitaData.tanggal_lahir.substring(0, 10) : '',
            };
            setFormData(processedData);
            setIsEditing(true);
        } else {
            // Reset form
            setFormData({
                nama_lengkap: '',
                nik: '',
                tanggal_lahir: '',
                jenis_kelamin: '',
                nama_ortu: '',
                alamat: '',
                berat_lahir: '',
                tinggi_lahir: '',
            });
            setIsEditing(false);
        }
    }, [balitaData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/balita/${formData.id}`, formData);
                toast.success('Data balita berhasil diperbarui!');
            } else {
                await api.post('/balita', formData);
                toast.success('Data balita berhasil ditambahkan!');
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{isEditing ? 'Edit Data Balita' : 'Tambah Data Balita Baru'}</h2>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nama Lengkap */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} placeholder="Masukkan nama lengkap balita" className="input-style" required />
                    </div>
                    {/* NIK */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                        <input name="nik" value={formData.nik} onChange={handleChange} placeholder="Masukkan NIK balita" className="input-style" required />
                    </div>
                    {/* Tanggal Lahir */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                        <input name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} type="text" placeholder="Format: YYYY-MM-DD, contoh: 2022-05-10" className="input-style" required />
                        <p className="text-xs text-gray-500 mt-1">Gunakan format Tahun-Bulan-Tanggal (contoh: 2022-05-10).</p>
                    </div>
                    {/* ... sisanya tetap sama ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                        <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="input-style">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Orang Tua/Wali</label>
                        <input name="nama_ortu" value={formData.nama_ortu} onChange={handleChange} placeholder="Masukkan nama orang tua atau wali" className="input-style" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                        <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Masukkan alamat lengkap" className="input-style" rows="3" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Berat Lahir (kg)</label>
                            <input name="berat_lahir" value={formData.berat_lahir} onChange={handleChange} type="number" step="0.01" placeholder="Contoh: 3.2" className="input-style" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tinggi Lahir (cm)</label>
                            <input name="tinggi_lahir" value={formData.tinggi_lahir} onChange={handleChange} type="number" step="0.01" placeholder="Contoh: 49" className="input-style" required />
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BalitaFormModal;