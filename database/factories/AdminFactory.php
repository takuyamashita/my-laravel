<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Admin;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Admin::class, function (Faker $faker) {
    return [
        'user_name' => $faker->name,
        'password' => Str::random(10),
        'remember_token' => Str::random(10)
    ];
});
