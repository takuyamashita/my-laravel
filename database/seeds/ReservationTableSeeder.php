<?php

use Illuminate\Database\Seeder;
use App\Models\Schedule;

class ReservationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currentTime = time();
        $endTime = time() + 60 * 60 * 24 * 90;
        $id = 1;
        while($currentTime < $endTime){

            $end = $currentTime + 60 * 20 * mt_rand(3,18);

            $reservation = new \App\Models\Reservation([
                'owner_name' => 'テスト',
                'from' => date("Y-m-d H:i:s",$currentTime),
                'end' => date("Y-m-d H:i:s",$end),
                'status' => 1,
                'schedule_digest' => Schedule::find(1)->hash_digest,
                'schedule_id' => Schedule::find(1)->id,
                'color_id' => mt_rand(1,15),
            ]);
            
            $reservation->save();

            $end += 60 * 20 * mt_rand(3,5);
            $currentTime = $end;
            ++ $id;
        }
    }
}
