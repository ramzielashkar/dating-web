<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsersController;




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

    Route::post("/register", [AuthController::class, "register"])->name("register-user");
    Route::post("/login", [AuthController::class, "login"])->name("login-user");

    Route::group(["middleware" => "jwt.verify"], function(){
      Route::get("/getusers/{id?}", [UsersController::class, "getUsers"])->name("get-users");

    });
