<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\SchedulePassword;
use Faker\Generator as Faker;

$factory->define(SchedulePassword::class, function (Faker $faker) {
    return [
        'password' => $faker->password,
        'schedule_id' => 1,
    ];
});
