<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PengaduanDitanggapiNotification;

class PengaduanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_pengadu' => 'required|string|max:255',
            'email_pengadu' => 'required|email',
            'no_hp' => 'nullable|string|max:20',
            'subjek' => 'required|string|max:255',
            'isi_pengaduan' => 'required|string',
        ]);
        $pengaduan = Pengaduan::create($validated);
        return response()->json($pengaduan, 201);
    }

    public function index()
    {
        $pengaduan = Pengaduan::with('penanggapi')->latest()->get();
        return response()->json($pengaduan);
    }

    public function update(Request $request, $id)
    {
        // Cari data pengaduan secara manual berdasarkan ID
        $pengaduan = Pengaduan::find($id);

        // Jika tidak ditemukan, kirim response 404
        if (!$pengaduan) {
            return response()->json(['message' => 'Pengaduan tidak ditemukan.'], 404);
        }

        // Validasi hanya field 'balasan'
        $validated = $request->validate([
            'balasan' => 'required|string',
        ]);

        // Update data yang ditemukan
        $pengaduan->balasan = $validated['balasan'];
        $pengaduan->status = 'Ditanggapi';
        $pengaduan->tanggal_ditanggapi = now();
        $pengaduan->penanggapi_id = $request->user()->id;
        $pengaduan->save();

        // Kirim notifikasi email
        Notification::route('mail', $pengaduan->email_pengadu)
                    ->notify(new PengaduanDitanggapiNotification($pengaduan));

        // Kembalikan data yang sudah diperbarui
        return response()->json($pengaduan);
    }
}
