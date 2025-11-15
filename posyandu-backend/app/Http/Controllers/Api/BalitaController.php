<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Balita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BalitaController extends Controller
{
    public function index(Request $request)
    {
        $query = Balita::query();
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('nama_lengkap', 'like', "%{$search}%")
                  ->orWhere('nama_ortu', 'like', "%{$search}%");
        }
        $balitas = $query->latest()->paginate(10);
        return response()->json($balitas);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|unique:balitas,nik',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nama_ortu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'berat_lahir' => 'required|numeric|min:0',
            'tinggi_lahir' => 'required|numeric|min:0',
        ]);
        $balita = Balita::create($validated);
        return response()->json($balita, 201);
    }

    public function show(Balita $balita)
    {
        return response()->json($balita);
    }

    public function update(Request $request, Balita $balita)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|unique:balitas,nik,' . $balita->id,
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'nama_ortu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'berat_lahir' => 'required|numeric|min:0',
            'tinggi_lahir' => 'required|numeric|min:0',
        ]);
        $balita->update($validated);
        return response()->json($balita);
    }

    public function destroy($id)
    {
        // Cari data balita berdasarkan ID
        $balita = Balita::find($id);

        // Jika data tidak ditemukan, kirim response 404
        if (!$balita) {
            return response()->json(['message' => 'Data tidak ditemukan.'], 404);
        }

        // Hapus data menggunakan Query Builder
        // Ini akan mengirimkan query SQL: DELETE FROM balitas WHERE id = ?
        $deletedRows = DB::table('balitas')->where('id', $id)->delete();

        // Jika ada baris yang terhapus (seharusnya 1), kirim response sukses
        if ($deletedRows > 0) {
            return response()->json(null, 204); // 204 No Content = sukses
        } else {
            return response()->json(['message' => 'Gagal menghapus data.'], 500);
        }
    }
}
