<?php

namespace App\Http\Services;

use App\Models\Schedule;
use App\Models\SchedulePassword;
use App\Models\ReservationColor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ScheduleService{

    public function storeSchedule($validatedRequest){
        $schedule = new Schedule;

        $schedule->name = $validatedRequest['name'];
        $schedule->description = $validatedRequest['description'];
        $schedule->permit_required = $validatedRequest['permit_required'];
        $schedule->password_required = $validatedRequest['password_required'];
        $schedule->owner_id = Auth::guard('web')->id();
        $schedule->hash_digest = hash('sha256',Auth::guard('web')->id().$validatedRequest['name']);

        return DB::transaction(function() use($schedule,$validatedRequest){
            
            $schedule->save();

            if($validatedRequest['password_required']){
                foreach($validatedRequest['schedule_passwords'] as $key => $passwordObject){

                    $schedulePassword = new SchedulePassword;

                    $schedulePassword->password = $passwordObject['schedule_password'];
                    $schedulePassword->schedule_id = $schedule->id;

                    $schedulePassword->save();
                    $schedulePassword->colors()->attach($passwordObject['colors']);
                }
            }

            return Schedule::where('id',$schedule->id)->with(['schedulePasswords.colors'])->get()->toJson();
        });
    }

}