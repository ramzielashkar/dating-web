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
      Route::post("/getusers", [UsersController::class, "getUsers"])->name("get-users");
      Route::post("/blockuser", [UsersController::class, "blockUser"])->name("block-user");
      Route::post("/favorite", [UsersController::class, "favoriteUser"])->name("block-user");
      Route::get("/getfavorites/{id?}", [UsersController::class, "getFavorites"])->name("get-favorites");
      Route::post("/profile", [UsersController::class, "addProfile"])->name("profile");
      Route::post("/updateprofile", [UsersController::class, "updateProfile"])->name("update-profile");
      Route::get("/getprofile/{id?}", [UsersController::class, "getProfile"])->name("get-profile");
      Route::post("/removefavorite", [UsersController::class, "removeFavorite"])->name("remove-favorites");
      Route::post("/chat", [UsersController::class, "addChat"])->name("chat");
      Route::post("/getchat", [UsersController::class, "getChats"])->name("get-chat");

    });
