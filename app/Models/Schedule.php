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
}
