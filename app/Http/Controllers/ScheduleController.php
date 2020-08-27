<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Schedule;
use App\Models\ReservationColor;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function __construct(){
        
    }
    
    public function userScheduleManageReact(){
        return view('user_schedule.schedule');
    }

    public function openScheduleManageReact(Schedule $schedule,Request $request){
        $hash_digest = $schedule->hash_digest;
        $password_required = $schedule->password_required;
        return view('open_schedule.schedule_top',compact('hash_digest','password_required'));
    }

    public function getOpenSchedule(Schedule $schedule,Request $request){

        $userId = Auth::guard('web')->id();

        if($schedule->password_required){
            $schedulePassword = $schedule->schedulePasswords()->where('password',$request->input('schedule_password'))->with('colors')->first();
            
            if($schedulePassword === null) return response()->json(['error'=>'パスワードが違います'],422);

            return response()->json([
                'color_root' => $schedulePassword->getRelations('colors'),
                'name' => $schedule->name,
                'description' => $schedule->description,
                'hash_digest' => $schedule->hash_digest,
                'permit_required' => $schedule->permit_required,
                'reservations' => $schedule->permitReservations()->with('color')->get(),
                'owner' => $userId !== null && $userId === $schedule->owner_id,
            ]); 
        }else{
            return response()->json([
                'color_root' => ['colors' => ReservationColor::all()],
                'name' => $schedule->name,
                'description' => $schedule->description,
                'hash_digest' => $schedule->hash_digest,
                'permit_required' => $schedule->permit_required,
                'reservations' => $schedule->permitReservations()->with('color')->get(),
                'owner' => $userId !== null && $userId === $schedule->owner_id,
            ]); 
        }

    }
}
