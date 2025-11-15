<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengaduans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pengadu');
            $table->string('email_pengadu');
            $table->string('no_hp')->nullable();
            $table->string('subjek');
            $table->text('isi_pengaduan');
            $table->enum('status', ['Baru', 'Ditanggapi', 'Ditutup'])->default('Baru');
            $table->text('balasan')->nullable();
            $table->timestamp('tanggal_ditanggapi')->nullable();
            $table->foreignId('penanggapi_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};
