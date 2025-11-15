<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap',
        'nik',
        'tanggal_lahir',
        'jenis_kelamin',
        'nama_ortu',
        'alamat',
        'berat_lahir',
        'tinggi_lahir',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    
}
