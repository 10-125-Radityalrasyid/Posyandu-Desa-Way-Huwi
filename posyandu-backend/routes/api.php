<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BalitaController;
use App\Http\Controllers\Api\IbuHamilController;
use App\Http\Controllers\Api\JadwalController;
use App\Http\Controllers\Api\PengaduanController;
use App\Http\Controllers\Api\UserController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/pengaduan', [PengaduanController::class, 'store']);
Route::get('/jadwal', [JadwalController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', function (Request $request) { return $request->user(); });

    Route::apiResource('balita', BalitaController::class);
    Route::apiResource('ibu-hamil', IbuHamilController::class);
    Route::apiResource('jadwal', JadwalController::class)->except(['index']);

    Route::get('/pengaduan', [PengaduanController::class, 'index']);
    Route::put('/pengaduan/{id}', [PengaduanController::class, 'update']);

    Route::middleware('role:admin')->group(function () {
        Route::get('/users/kader', [UserController::class, 'index']);
        Route::post('/users/kader', [UserController::class, 'store']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
