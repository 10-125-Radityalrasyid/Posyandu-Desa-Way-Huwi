import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

const IbuHamilFormModal = ({ isOpen, onClose, ibuHamilData, onRefresh }) => {
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        nik: '',
        tanggal_lahir: '',
        alamat: '',
        hpht: '',
        usia_kehamilan: '',
        status_imunisasi_tt: '',
        status_pemberian_fe: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (ibuHamilData) {
            // MEMOTONG TANGGAL SEBELUM DIMASUKKAN KE STATE
            const processedData = {
                ...ibuHamilData,
                // Ambil 10 karakter pertama dari string tanggal
                tanggal_lahir: ibuHamilData.tanggal_lahir ? ibuHamilData.tanggal_lahir.substring(0, 10) : '',
                hpht: ibuHamilData.hpht ? ibuHamilData.hpht.substring(0, 10) : '',
            };
            setFormData(processedData);
            setIsEditing(true);
        } else {
            // Reset form
            setFormData({
                nama_lengkap: '',
                nik: '',
                tanggal_lahir: '',
                alamat: '',
                hpht: '',
                usia_kehamilan: '',
                status_imunisasi_tt: '',
                status_pemberian_fe: '',
            });
            setIsEditing(false);
        }
    }, [ibuHamilData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/ibu-hamil/${formData.id}`, formData);
                toast.success('Data ibu hamil berhasil diperbarui!');
            } else {
                await api.post('/ibu-hamil', formData);
                toast.success('Data ibu hamil berhasil ditambahkan!');
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
                    <h2 className="text-xl font-bold">{isEditing ? 'Edit Data Ibu Hamil' : 'Tambah Data Ibu Hamil Baru'}</h2>
                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nama Lengkap */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                        <input name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} placeholder="Masukkan nama lengkap ibu hamil" className="input-style" required />
                    </div>
                    {/* NIK */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                        <input name="nik" value={formData.nik} onChange={handleChange} placeholder="Masukkan NIK ibu hamil" className="input-style" required />
                    </div>
                    {/* Tanggal Lahir - SUDAH DIPERBAIKI */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir Ibu</label>
                        <input name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} type="text" placeholder="Format: YYYY-MM-DD, contoh: 1995-11-20" className="input-style" required />
                        <p className="text-xs text-gray-500 mt-1">Gunakan format Tahun-Bulan-Tanggal (contoh: 1995-11-20).</p>
                    </div>
                    {/* Alamat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                        <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Masukkan alamat lengkap" className="input-style" rows="3" required />
                    </div>
                    {/* HPHT - SUDAH DIPERBAIKI */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">HPHT (Hari Pertama Haid Terakhir)</label>
                        <input name="hpht" value={formData.hpht} onChange={handleChange} type="text" placeholder="Format: YYYY-MM-DD, contoh: 2023-10-01" className="input-style" required />
                        <p className="text-xs text-gray-500 mt-1">Tanggal pertama haid terakhir. Gunakan format Tahun-Bulan-Tanggal.</p>
                    </div>
                    {/* ... sisanya tetap sama ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usia Kehamilan (minggu)</label>
                        <input name="usia_kehamilan" value={formData.usia_kehamilan} onChange={handleChange} type="number" placeholder="Contoh: 24" className="input-style" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status Imunisasi TT</label>
                            <select name="status_imunisasi_tt" value={formData.status_imunisasi_tt} onChange={handleChange} className="input-style">
                                <option value="Lengkap">Lengkap</option>
                                <option value="Tidak Lengkap">Tidak Lengkap</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status Pemberian Fe</label>
                            <select name="status_pemberian_fe" value={formData.status_pemberian_fe} onChange={handleChange} className="input-style">
                                <option value="Rutin">Rutin</option>
                                <option value="Tidak Rutin">Tidak Rutin</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">Batal</button>
                        <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IbuHamilFormModal;