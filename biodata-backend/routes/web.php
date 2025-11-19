<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\BiodataController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/api/biodata', [BiodataController::class, 'index']);
// Route::post('/api/biodata', [BiodataController::class, 'store']);
