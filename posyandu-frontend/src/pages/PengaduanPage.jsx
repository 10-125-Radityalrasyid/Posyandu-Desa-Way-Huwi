import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const PengaduanPage = () => {
    const [pengaduanList, setPengaduanList] = useState([]); const [selectedPengaduan, setSelectedPengaduan] = useState(null); const [balasan, setBalasan] = useState('');
    useEffect(() => { api.get('/pengaduan').then(res => setPengaduanList(res.data)).catch(err => console.error(err)); }, []);
    const handleTanggapi = async (id) => { if (!balasan.trim()) { toast.error('Balasan tidak boleh kosong.'); return; } try { await api.put(`/pengaduan/${id}`, { balasan }); toast.success('Pengaduan berhasil ditanggapi!'); api.get('/pengaduan').then(res => setPengaduanList(res.data)); setSelectedPengaduan(null); setBalasan(''); } catch (error) { toast.error('Gagal menanggapi.'); } };
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Pengaduan</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {pengaduanList.map(p => (
                        <div key={p.id} onClick={() => setSelectedPengaduan(p)} className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
                            <h3 className="font-semibold text-lg">{p.subjek}</h3>
                            <p className="text-sm text-gray-500">dari: {p.nama_pengadu} ({p.email_pengadu})</p>
                            <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${p.status === 'Baru' ? 'bg-yellow-100 text-yellow-800' : p.status === 'Ditanggapi' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{p.status}</span>
                        </div>
                    ))}
                </div>
                {selectedPengaduan && (
                    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
                        <h2 className="text-xl font-bold mb-4">Detail & Tanggapan</h2>
                        <p className="font-semibold">{selectedPengaduan.subjek}</p>
                        <p className="text-gray-600 my-2">{selectedPengaduan.isi_pengaduan}</p>
                        <hr className="my-4" />
                        {selectedPengaduan.status === 'Ditanggapi' ? (
                            <div><p className="font-semibold text-green-600">Sudah Ditanggapi:</p><p className="bg-gray-100 p-3 rounded mt-2">{selectedPengaduan.balasan}</p></div>
                        ) : (
                            <div><label className="block text-sm font-medium text-gray-700">Tulis Balasan</label><textarea className="w-full mt-1 input-style" rows="4" value={balasan} onChange={(e) => setBalasan(e.target.value)}></textarea><button onClick={() => handleTanggapi(selectedPengaduan.id)} className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Kirim Tanggapan</button></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default PengaduanPage;