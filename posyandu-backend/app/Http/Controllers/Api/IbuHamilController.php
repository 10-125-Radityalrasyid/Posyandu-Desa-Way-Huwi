<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IbuHamil;
use Illuminate\Http\Request;

class IbuHamilController extends Controller
{
    public function index(Request $request)
    {
        $query = IbuHamil::query();
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('nama_lengkap', 'like', "%{$search}%");
        }
        $ibuHamil = $query->latest()->paginate(10);
        return response()->json($ibuHamil);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|unique:ibu_hamils,nik',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'hpht' => 'required|date',
            'usia_kehamilan' => 'required|integer|min:0|max:42',
            'status_imunisasi_tt' => 'required|in:Lengkap,Tidak Lengkap',
            'status_pemberian_fe' => 'required|in:Rutin,Tidak Rutin',
        ]);
        $ibuHamil = IbuHamil::create($validated);
        return response()->json($ibuHamil, 201);
    }

    public function show(IbuHamil $ibuHamil) { return response()->json($ibuHamil); }

    public function update(Request $request, IbuHamil $ibuHamil)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|unique:ibu_hamils,nik,' . $ibuHamil->id,
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'hpht' => 'required|date',
            'usia_kehamilan' => 'required|integer|min:0|max:42',
            'status_imunisasi_tt' => 'required|in:Lengkap,Tidak Lengkap',
            'status_pemberian_fe' => 'required|in:Rutin,Tidak Rutin',
        ]);
        $ibuHamil->update($validated);
        return response()->json($ibuHamil);
    }

    public function destroy(IbuHamil $ibuHamil)
    {
        $ibuHamil->delete();
        return response()->json(null, 204);
    }
}
