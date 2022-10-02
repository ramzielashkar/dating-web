<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


  Route::group(['middleware'=>'api', 'prefix'=>'auth'], function($router)
  {
    Route::post("/register", [AuthController::class, "register"])->name("register-user");
    Route::post("/login", [AuthController::class, "login"])->name("login-user");
    //Route::get("/addinterest/{interest_name?}", [AuthController::class, "addCategory"]);
  });
