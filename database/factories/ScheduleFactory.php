<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Schedule;
use Faker\Generator as Faker;

$factory->define(Schedule::class, function (Faker $faker) {
    return [
        'permit_required' => true,
        'password_required' => false,
        'schedule_password' => null,
        'name' => $faker->name,
        'description' => $faker->text,
        'owner_id' => function(){
            return App\Models\Admin::find(1);
        },
        'hash_digest' => $faker->slug,
    ];
});
