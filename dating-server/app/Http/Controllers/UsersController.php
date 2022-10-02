<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Block;
use App\Models\Favorite;
use App\Models\Profile;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
  // function to get users
  function getUsers(Request $request){

    $user_id = $request->user_id;
    $id = $request->id;
    if(!$id){
          return User::
          leftJoin('blocks', function ($join) {
            $join->on('users.id', '=', 'blocks.id')
                 ->whereNotExists('blocked_id');
        })
          ->where('users.id', '!=', $user_id)
          ->get();

      }
      return User::find($id);
  }

  // function to block users
  function blockUser(Request $request)
  {
    $user_id = $request->user_id;
    $blocked_id = $request->blocked_id;

    $block = new Block;
    $block->user_id = $user_id;
    $block->blocked_id = $blocked_id;

    if($block->save()){
          return response()->json([
              "status" => "Success",
              "data" => $block,
          ]);
      }
  }

  // function to favorite users
  function favoriteUser(Request $request)
  {
    $user_id = $request->user_id;
    $favorite_id = $request->favorite_id;

    $favorite = new Favorite;
    $favorite->follower_id = $user_id;
    $favorite->followed_id = $favorite_id;

    if($favorite->save()){
          return response()->json([
              "status" => "Success",
              "data" => $favorite,
          ]);
      }
  }

  // function to get favorites
  function getFavorites($id)
  {
    return $favorite = DB::table('users')
    ->join('favorites', function ($join) use($id) {
                $join->on('users.id', '=', 'favorites.followed_id')
                     ->where('favorites.follower_id', '=', $id)
                     ->where('favorites.active', '=', 0);
            })
            ->get();
  }

  // function to remove favorites
  function removeFavorite(Request $request){
    $user_id = $request->user_id;
    $favorite_id = $request->favorite_id;

    DB::table('favorites')
             ->where('follower_id', $user_id)
             ->where('followed_id', $favorite_id)
             ->update(['active' => '1']);
  }
  // function to add Profile

  function addProfile(Request $request){
    $profile = new Profile;
    $user_id = $request->user_id;
    $profile_picture = $request->profile_picture;
    $bio = $request->bio;

    $profile->user_id = $user_id;
    $profile->profile_picture = $profile_picture;
    $profile->bio = $bio;

    if($profile->save()){
          return response()->json([
              "status" => "Success",
              "data" => $profile,
          ]);
      }
  }

  // function to Update Profile
  function updateProfile(Request $request){
    $user_id = $request->user_id;
    $profile_picture = $request->profile_picture;
    $bio = $request->bio;

   DB::table('profiles')
            ->where('user_id', $user_id)
            ->update(['profile_picture' => $profile_picture,
          'bio' => $bio]);

  }
  // function to get Profile
  function getProfile($id=null){
    if(!$id){
      return Profile::all();
    }
    else{
      return DB::table('profiles')
                ->where('user_id', $id)
              ->get();
    }
  }


}
