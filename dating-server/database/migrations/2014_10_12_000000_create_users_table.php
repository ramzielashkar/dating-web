<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('interests', function (Blueprint $table) {
              $table->id();
              $table->string('interest');
              $table->rememberToken();
              $table->timestamps();
          });
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->integer('age')->default('1');
                $table->string('gender')->default('Male');
                $table->text('location')->default('Beirut');;
                $table->integer('interest_id')->references('id')->on("interests")->default('1');;
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->rememberToken();
                $table->timestamps();
            });
            Schema::create('profiles', function (Blueprint $table) {
                $table->id();
                $table->integer('user_id')->references('id')->on('users');
                $table->string('profile_picture');
                $table->text('bio');
                $table->rememberToken();
                $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('interests');
        Schema::dropIfExists('profiles');

    }
}
