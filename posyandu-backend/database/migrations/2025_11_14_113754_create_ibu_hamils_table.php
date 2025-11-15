<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ibu_hamils', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('nik')->unique();
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->date('hpht');
            $table->integer('usia_kehamilan');
            $table->enum('status_imunisasi_tt', ['Lengkap', 'Tidak Lengkap']);
            $table->enum('status_pemberian_fe', ['Rutin', 'Tidak Rutin']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ibu_hamils');
    }
};
