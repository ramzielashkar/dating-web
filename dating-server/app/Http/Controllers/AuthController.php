<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\Profile;

class AuthController extends Controller
{
  // function to register Users
    public function register(Request $request)
    {
          $name = $request->name;
          $email = $request->email;
          $password = $request->password;
          $age = $request->age;
          $location = $request->location;
          $gender = $request->gender;
          $interest_id = $request->interest_id;
          $password = Hash::make($password);


          $user = new User;
          $user->age = $age;
          $user->location = $location;
          $user->email = $email;
          $user->name = $name;
          $user->password = $password;
          $user->gender = $gender;
          $user->interest_id = $interest_id;
          $token = JWTAuth::fromUser($user);


          if($user->save()){
              $profile = new Profile;
              $profile->user_id = $user->id;
              $profile->profile_picture = "default.png";
              $profile->bio = "";
              if($profile->save()){
                return response()->json([
                    "status" => "Success",
                    "data" => $user,
                    "token"=>$token,
                    "profile"=>$profile
                ]);
              }

            }
    }


    // function to login
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user =  User:: where('email', request(['email']))->get();
        return response()->json([
            "status" => "Success",
            "token"=>$token,
            "user"=>$user
        ]);
    }





}
