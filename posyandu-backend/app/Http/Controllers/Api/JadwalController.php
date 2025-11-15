<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JadwalPosyandu;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    public function index()
    {
        $jadwals = JadwalPosyandu::orderBy('tanggal')->get();
        return response()->json($jadwals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i',
            'tempat' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);
        $jadwal = JadwalPosyandu::create($validated);
        return response()->json($jadwal, 201);
    }

    public function show(JadwalPosyandu $jadwal) { return response()->json($jadwal); }

    public function update(Request $request, JadwalPosyandu $jadwal)
    {
        $validated = $request->validate([
            'kegiatan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i',
            'tempat' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
        ]);
        $jadwal->update($validated);
        return response()->json($jadwal);
    }

    public function destroy(JadwalPosyandu $jadwal)
    {
        $jadwal->delete();
        return response()->json(null, 204);
    }
}
