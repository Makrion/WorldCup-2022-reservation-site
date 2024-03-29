<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MatchTableController;
use App\Http\Controllers\StadiumController;
use App\Http\Controllers\TicketController;

#note: still didn't apply the verification and authorization rules

# common routes
Route::post('/user/login', [UserController::class,'login']);
Route::post('/user/register', [UserController::class,'register']);
Route::post('/user/logout', [UserController::class,'logout'])->middleware('auth:api');
Route::put('/user/update', [UserController::class,'update'])->middleware('auth:api');
Route::get('/matches', [MatchTableController::class,'index']);
Route::get('/match/{id}', [MatchTableController::class,'show']);

# admin routes
Route::delete('/user/delete', [UserController::class,'delete'])->middleware('auth:api');
Route::post('/user/verify', [UserController::class,'verify'])->middleware('auth:api');
Route::post('/user/index', [UserController::class,'index'])->middleware('auth:api');
Route::post('/user/index/unverified', [UserController::class,'index_unverified'])->middleware('auth:api');

# manager routes
Route::post('/match/create', [MatchTableController::class,'create'])->middleware('auth:api', 'verified');
Route::put('/match/update/{id}', [MatchTableController::class,'update'])->middleware('auth:api', 'verified');
Route::post('/stadium/create', [StadiumController::class,'create'])->middleware('auth:api', 'verified');
Route::get('/stadiums', [StadiumController::class,'index'])->middleware('auth:api', 'verified');

# fan
Route::post('/ticket/create', [TicketController::class,'create'])->middleware('auth:api');
Route::get('/tickets', [TicketController::class,'index'])->middleware('auth:api');
Route::delete('/ticket/delete', [TicketController::class,'delete'])->middleware('auth:api');