<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/events/store', [EventController::class, 'store']);
Route::put('/events/{event}/update', [EventController::class, 'update']);
Route::delete('/events/{id}/delete', [EventController::class, 'destroy']);
Route::get('/events', [EventController::class, 'index']);