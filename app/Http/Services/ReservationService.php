<?php

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\SchedulePassword;
use App\Models\ReservationColor;
use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationService{

    protected $request;

    protected $schedule;

    protected $password;

    public function __construct(Request $request){
        $this->request = $request;

        $this->schedule = Schedule::where('hash_digest',$this->request->input('hash_digest'))->get()->first();

        $this->password = $this->schedule->schedulePasswords()->where('password',$this->request->input('schedule_password'))->get();
        
    }

    public function getSchedule(){
        return $this->schedule;
    }

    public function getAvailableColor(){
        return count($this->password) === 1 ? $this->password->first()->colors()->get() : ReservationColor::all();
    }

    public function authorizeWithPassword(){
        if($this->schedule->password_required){
            if(count($this->password) === 1){
                return true;
            }
            return false;
        }else{
            return true;
        }

        return false;
    }

    public function storeReservation($validatesArray){
        $reservation = new Reservation;

        $reservation->owner_name = $validatesArray['owner_name'];
        $reservation->from = $validatesArray['from'];
        $reservation->end = $validatesArray['end'];
        $reservation->status = $this->schedule->permit_required ? 0 : 1;
        $reservation->schedule_digest = $validatesArray['hash_digest'];
        $reservation->schedule_id = $this->schedule->id;
        $reservation->color_id = $validatesArray['color'];

        $reservation->save();

        return $reservation;
    }

}