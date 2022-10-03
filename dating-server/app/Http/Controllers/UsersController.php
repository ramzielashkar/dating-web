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
    if(!$id){

        return User:: leftJoin('profiles', function ($join) {
                    $join->on('profiles.user_id', '=', 'users.id');
                  })
                       ->whereNotExists(function ($query) use($user_id){
                $query->select()
                      ->from('blocks')
                      ->where('blocks.blocked_id', '=', 'users.id')
                      ->where('blocks.user_id', '=', $user_id);
                    })
                    ->where('users.id', '!=', $user_id)
                    ->orderby('users.id')
                    ->get();

        //   return User::
        //   leftJoin('blocks', function ($join) {
        //     $join->on('users.id', '=', 'blocks.id')
        //          ->where('blocked_id', '!=', 'users.id');
        // })
        //   ->where('users.id', '!=', $user_id)
        //   ->get();

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
    return User::join('favorites', function ($join) use($id) {
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

    Favorite::where('follower_id', $user_id)
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
      return Profile::where('user_id', $id)
                    ->get();

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
      return Chat:: leftJoin('profiles', function ($join) {
                  $join->on('profiles.user_id', '=', 'chats.receiver_id');
                })
                ->Join('users', function ($join) {
                            $join->on('users.id', '=', 'chats.receiver_id');
                          })
                          ->where('chats.sender_id', '=', $user_id)
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
                          ->get();
    }
  }
}
