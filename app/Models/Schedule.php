<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    //
    public function getRouteKeyName(){
        return 'hash_digest';
    }
    public function schedulePasswords(){
        return $this->hasMany('App\Models\SchedulePassword');
    }

    public function reservations(){
        return $this->hasMany('App\Models\Reservation');
    }

    //承認済みの予約
    public function permitReservations(){
        return $this->hasMany('App\Models\Reservation')->where('status',1);
    }

    public function notPermitReservations(){
        return $this->hasMany('App\Models\Reservation')->where('status',0);
    }
}
