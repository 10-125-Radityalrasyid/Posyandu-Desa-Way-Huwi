<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IbuHamil extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap',
        'nik',
        'tanggal_lahir',
        'alamat',
        'hpht',
        'usia_kehamilan',
        'status_imunisasi_tt',
        'status_pemberian_fe',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'hpht' => 'date',
    ];
}
