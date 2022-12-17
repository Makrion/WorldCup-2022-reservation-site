<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;



#note: still didn't apply the verification and authorization rules

# user routes
Route::post('/user/login', [UserController::class,'login']);
Route::post('/user/register', [UserController::class,'register']);
Route::post('/user/logout', [UserController::class,'logout'])->middleware('auth:api');
Route::put('/user/update', [UserController::class,'update'])->middleware('auth:api');

# admin routes
Route::delete('/user/delete', [UserController::class,'delete'])->middleware('auth:api');
Route::post('/user/verify', [UserController::class,'verify'])->middleware('auth:api');
Route::post('/user/index', [UserController::class,'index'])->middleware('auth:api');
Route::post('/user/index/unverified', [UserController::class,'index_unverified'])->middleware('auth:api');

# manager routes

# match routes

# stadium routes

# ticket routes