<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Block;
use App\Models\Favorite;
use App\Models\Profile;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
  // function to get users
  function getUsers(Request $request){

    $user_id = $request->user_id;
    $id = $request->id;
    $interest = User::select('interest_id')->where('id', $user_id)->get();
    $interest = (int) filter_var($interest, FILTER_SANITIZE_NUMBER_INT);
    if($interest == 1){
      $gender = "Male";
    }else if($interest == 2){
      $gender = "Female";
    }else{
      if(!$id){
          return User::whereNotExists(function ($query) use($user_id){
                      $query
                        ->from('blocks')
                        ->whereColumn('blocks.blocked_id', 'users.id')
                        ->where('blocks.user_id', '=', $user_id);
                      })
                      ->Join('profiles', function ($join) {
                                  $join->on('profiles.user_id', '=', 'users.id');
                                })
                      ->where('users.id', '!=', $user_id)
                      ->where('users.gender', '=', $gender)
                      ->get();

        }
        return User:: Join('profiles', function ($join) use($id){
                    $join->on('profiles.user_id', '=', 'users.id');
                  })
                  ->where('users.id', "=", $id)
                  ->first();
                    }
    if(!$id){
        return User::whereNotExists(function ($query) use($user_id){
                    $query
                      ->from('blocks')
                      ->whereColumn('blocks.blocked_id', 'users.id')
                      ->where('blocks.user_id', '=', $user_id);
                    })
                    ->Join('profiles', function ($join) {
                                $join->on('profiles.user_id', '=', 'users.id');
                              })
                    ->where('users.id', '!=', $user_id)
                    ->where('users.gender', '=', $gender)
                    ->get();


      }
      return User:: Join('profiles', function ($join) use($id){
                  $join->on('profiles.user_id', '=', 'users.id');
                })
                ->where('users.id', "=", $id)
                ->first();
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
    return User::join('favorites', function ($join) use($id) {
                $join->on('users.id', '=', 'favorites.followed_id')
                     ->where('favorites.follower_id', '=', $id)
                     ->where('favorites.active', '=', 0);
            })
            ->Join('profiles', function ($join) use($id){
                        $join->on('profiles.user_id', '=', 'users.id');
                      })
            ->get();
  }

  // function to remove favorites
  function removeFavorite(Request $request){
    $user_id = $request->user_id;
    $favorite_id = $request->favorite_id;

    Favorite::where('follower_id', $user_id)
    ->where('followed_id', $favorite_id)
    ->update(['active' => '1']);
  }
  // function to add or update Profile

  function addProfile(Request $request){
    $profile = new Profile;
    $user_id = $request->user_id;
    $profile_picture = $request->profile_picture;
    $bio = $request->bio;
     $folderPath = "Controllers";
    $exists = Profile::where('user_id', $user_id)->count() > 0;
    if(!$exists){
      if($profile_picture){
      $base64Image = explode(";base64,", $profile_picture);
      $explodeImage = explode("image/", $base64Image[0]);
      $imageType = $explodeImage[1];
      $image_base64 = base64_decode($base64Image[1]);
      $imageName = $user_id.'.'.'png';
      \File::put(storage_path(). '/' . $imageName, base64_decode($base64Image[1]));
  $profile->user_id = $user_id;
  $profile->profile_picture = $imageName;
  $profile->bio = $bio;
}else{
  $profile->user_id = $user_id;
  $profile->profile_picture = $profile_picture;
  $profile->bio = $bio;
}

  if($profile->save()){
        return response()->json([
            "status" => "Success",
            "data" => $profile,
        ]);
    }

  }else{
    if($profile_picture){
    $base64Image = explode(";base64,", $profile_picture);
    $explodeImage = explode("image/", $base64Image[0]);
    $imageType = $explodeImage[1];
    $image_base64 = base64_decode($base64Image[1]);
    $imageName = $user_id.'.'.'png';
    \File::put(storage_path(). '/' . $imageName, base64_decode($base64Image[1]));
    Profile::where('user_id', $user_id)
              ->update(['profile_picture' => $imageName,
            'bio' => $bio]);
}else{
  Profile::where('user_id', $user_id)
            ->update(['profile_picture' => $profile_picture,
          'bio' => $bio]);
}

  }

  }

  // function to Update Profile
  function updateProfile(Request $request){
    $user_id = $request->user_id;
    $profile_picture = $request->profile_picture;
    $bio = $request->bio;

    Profile::where('user_id', $user_id)
              ->update(['profile_picture' => $profile_picture,
            'bio' => $bio]);
  }
  // function to get Profile
  function getProfile($id=null){
    if(!$id){
      return Profile::all();
    }
    else{
      return User:: Join('profiles', function ($join) use($id){
                  $join->on('profiles.user_id', '=', 'users.id');
                })
                ->where('users.id', "=", $id)
                ->first();

    }
  }

  // function to add chat
  function addChat(Request $request)
  {
    $sender = $request->sender_id;
    $receiver = $request->receiver_id;
    $content = $request->content;

    $chat = new Chat;
    $chat->sender_id = $sender;
    $chat->receiver_id = $receiver;
    $chat->content = $content;

    if($chat->save()){
          return response()->json([
              "status" => "Success",
              "data" => $chat,
          ]);
      }

  }

  // function to get chats
  function getChats(Request $request)
  {
    $user_id = $request->user_id;
    $receiver_id = $request->receiver_id;
    $profile = new Profile;
    if(!$receiver_id){
      return Chat::Join('profiles', function ($join) use($user_id) {
                  $join->on('profiles.user_id', '=', 'chats.receiver_id');
                })
                ->Join('users', function ($join) {
                            $join->on('users.id', '=', 'chats.receiver_id');
                            // $join->on('users.id', '=', 'chats.sender_id');
                          })
                          ->where('chats.sender_id', '=', $user_id)
                          ->orWhere('chats.receiver_id', '=', $user_id)
                          //->where('profiles.user_id' '!=', $user_id);
                          ->get();
    }else{
      return Chat:: leftJoin('profiles', function ($join) use($receiver_id){
                  $join->on('profiles.user_id', '=', 'chats.receiver_id');
                })
                ->leftJoin('users', function ($join) use($receiver_id) {
                            $join->on('users.id', '=', 'chats.receiver_id');
                          })
                          ->where('chats.sender_id', '=', $user_id)
                          ->where('chats.receiver_id', '=', $receiver_id)
                          ->orWhere('chats.sender_id', '=', $receiver_id)
                          ->where('chats.receiver_id', '=', $user_id)
                          ->get();
    }
  }
}
