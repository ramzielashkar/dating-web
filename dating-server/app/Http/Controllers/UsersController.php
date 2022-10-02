<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
  function getUsers($id = null){
    if(!$id){
          return User::all();
      }
      return User::find($id);
  }
}
