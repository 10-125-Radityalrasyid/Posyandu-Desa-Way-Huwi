import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import api from '../services/api';
import { toast } from 'react-toastify';
import { CalendarDaysIcon, ChatBubbleLeftRightIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const PublicHomePage = () => {
    const [jadwals, setJadwals] = useState([]);
    const [form, setForm] = useState({ nama_pengadu: '', email_pengadu: '',no_hp: '', subjek: '', isi_pengaduan: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        api.get('/jadwal').then(res => {
            setJadwals(res.data);
        }).catch(err => {
            console.error("Gagal memuat jadwal:", err);
            toast.error("Gagal memuat jadwal dari server.");
        });
    }, []);

    const handleInputChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

    const handleSubmitPengaduan = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/pengaduan', form);
            toast.success('Pengaduan Anda berhasil terkirim! Kami akan segera menindaklanjuti.');
            setForm({ nama_pengadu: '', email_pengadu: '', subjek: '', isi_pengaduan: '' });
        } catch (error) {
            toast.error('Gagal mengirim pengaduan. Periksa koneksi internet Anda.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header dengan Tombol Login */}
            <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">Posyandu Desa Sejahtera</h1>
                        <p className="mt-2 text-sm md:text-base opacity-90">Melayani dengan Kasih, Membangun Generasi Sehat</p>
                    </div>
                    {/* TAMBAHKAN TOMBOL LOGIN INI */}
                    <Link to="/login" className="flex items-center bg-white text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300">
                        <UserCircleIcon className="w-5 h-5 mr-2" />
                        Login Admin/Kader
                    </Link>
                </div>
            </header>

            {/* ... Sisanya tidak berubah ... */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Jadwal Kegiatan</h2>
                <p className="text-center text-gray-600 mb-8">Berikut adalah jadwal kegiatan Posyandu yang dapat diikuti oleh seluruh warga.</p>
                {jadwals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jadwals.map((j) => (
                            <div key={j.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-bold text-lg flex items-center text-gray-800">
                                    <CalendarDaysIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                                    {j.kegiatan}
                                </h3>
                                <p className="text-gray-600 text-sm mt-3"><span className="font-semibold">Tanggal:</span> {formatDate(j.tanggal)}</p>
                                <p className="text-gray-600 text-sm"><span className="font-semibold">Waktu:</span> Pukul {j.waktu_mulai} - {j.waktu_selesai} WIB</p>
                                <p className="text-gray-600 text-sm"><span className="font-semibold">Tempat:</span> {j.tempat}</p>
                                {j.keterangan && <p className="text-gray-500 text-xs mt-2 italic">Catatan: {j.keterangan}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CalendarDaysIcon className="w-16 h-16 text-gray-300 mx-auto" />
                        <p className="text-gray-500 mt-4">Belum ada jadwal yang tersedia saat ini.</p>
                    </div>
                )}
            </section>

            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 mr-3 text-blue-600" />
                        Kirim Pengaduan atau Saran
                    </h2>
                    <p className="text-center text-gray-600 mb-8">Kami terbuka untuk masukan Anda demi peningkatan pelayanan.</p>
                    <form onSubmit={handleSubmitPengaduan} className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input name="nama_pengadu" value={form.nama_pengadu} onChange={handleInputChange} placeholder="Masukkan nama lengkap Anda" className="input-style" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Aktif</label>
                            <input name="email_pengadu" value={form.email_pengadu} onChange={handleInputChange} type="email" placeholder="email@example.com" className="input-style" required />
                            <p className="text-xs text-gray-500 mt-1">Email akan digunakan untuk menerima balasan dari kami.</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon (Opsional)</label>
                            <input name="no_hp" value={form.no_hp} onChange={handleInputChange} placeholder="08xx-xxxx-xxxx" className="input-style" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                            <input name="subjek" value={form.subjek} onChange={handleInputChange} placeholder="Judul singkat pengaduan atau saran" className="input-style" required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pengaduan atau Saran</label>
                            <textarea name="isi_pengaduan" value={form.isi_pengaduan} onChange={handleInputChange} placeholder="Jelaskan secara detail keluhan atau saran Anda..." className="input-style" rows="5" required></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Mengirim...' : 'Kirim Pengaduan'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default PublicHomePage;