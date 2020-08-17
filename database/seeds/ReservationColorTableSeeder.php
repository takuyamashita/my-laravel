<?php

use Illuminate\Database\Seeder;

class ReservationColorTableSeeder extends Seeder
{

    private $colors = [
        [
            'background_color' => '#007bff',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#6c757d',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#28a745',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#dc3545',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#ffc107',
            'text_color' => '#343a40',
        ],
        [
            'background_color' => '#17a2b8',
            'text_color' => '#ffffff',
        ],
        [
            'background_color' => '#f8f9fa',
            'text_color' => '#343a40',
        ],
        [
            'background_color' => '#343a40',
            'text_color' => '#ffffff',
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
