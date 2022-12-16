<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

# user routes
#Route::post('/login', [UserController::class,'login'])->name('login');
Route::post('/register', [UserController::class,'register']);
#Route::post('/logout', [UserController::class,'logout'])->name('logout')->middleware('auth:api');
