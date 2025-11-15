<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Pengaduan extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nama_pengadu',
        'email_pengadu',
        'no_hp',
        'subjek',
        'isi_pengaduan',
        'status',
        'balasan',
        'tanggal_ditanggapi',
        'penanggapi_id',
    ];

    protected $casts = [
        'tanggal_ditanggapi' => 'datetime',
    ];

    public function penanggapi()
    {
        return $this->belongsTo(User::class, 'penanggapi_id');
    }
}
