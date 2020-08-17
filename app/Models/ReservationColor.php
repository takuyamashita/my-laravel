<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReservationColor extends Model
{
    protected $hidden = [
        'created_at', 'updated_at','pivot'
    ];
    //
    public function schedulePasswords(){
        return $this->belongsToMany('App\Models\SchedulePassword');
    }

    public function reservations(){
        return $this->belongsToMany('App\Models\Reservation');
    }
}
