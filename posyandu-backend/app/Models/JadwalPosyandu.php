<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalPosyandu extends Model
{
    use HasFactory;

    protected $fillable = [
        'kegiatan',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'tempat',
        'keterangan',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];
}
