<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BiodataController;

Route::get('/biodata', [BiodataController::class, 'index']);
Route::post('/biodata', [BiodataController::class, 'store']);
