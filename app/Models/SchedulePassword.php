<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchedulePassword extends Model
{
    //
    public function colors(){
        return $this->belongsToMany('App\Models\ReservationColor');
    }
    public function schedule(){
        return $this->belongsTo('App\Models\Schedule');
    }
}
