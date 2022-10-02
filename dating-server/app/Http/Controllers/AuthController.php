<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

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


          if($user->save()){
                return response()->json([
                    "status" => "Success",
                    "data" => $user,
                ]);
            }

    }



    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    // 
    // public function me()
    // {
    //     return response()->json(auth()->user());
    // }
    //
    //
    //
    // public function logout()
    // {
    //     auth()->logout();
    //
    //     return response()->json(['message' => 'Successfully logged out']);
    // }
    //
    //
    // public function refresh()
    // {
    //     return $this->respondWithToken(auth()->refresh());
    // }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl')
        ]);
    }
}
