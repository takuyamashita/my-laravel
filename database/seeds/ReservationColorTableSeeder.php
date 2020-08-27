<?php

use Illuminate\Database\Seeder;

class ReservationColorTableSeeder extends Seeder
{

    private $colors = [
        [
            'background_color' => '#fc6a6a',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#fc6a96',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#fc6ac7',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#eb6afc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#b56afc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#8d6afc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#6a6afc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#6ab1fc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#6ae2fc',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#6afce2',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#6afcc7',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#6afc77',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#a8fc6a',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#d9fc6a',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#f8fc6a',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#fceb6a',
            'text_color' => '#1e4a79',
        ],
        [
            'background_color' => '#fcd06a',
            'text_color' => '#1e4a79',
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0, $length = count($this->colors); $i < $length; ++$i){
            $color = new \App\Models\ReservationColor([
                'background_color' => $this->colors[$i]['background_color'],
                'text_color' => $this->colors[$i]['text_color']
            ]);
            $color->save();
        }
    }
}
