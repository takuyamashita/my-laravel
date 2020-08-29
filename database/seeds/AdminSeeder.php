<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
        $user = new \App\Models\Admin([
            'user_name' => 'yamada',
            'password' => bcrypt('1234'),
            'remember_token' => Str::random(10),
        ]);
        $user->save();
        */
        factory(App\Models\Admin::class)->create([
            'id' => 1,
            'user_name' => 'yamada',
            'password' => bcrypt('1234'),
        ]);
    }
}
