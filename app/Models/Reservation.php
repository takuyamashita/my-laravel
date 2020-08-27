<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    
    protected $fillable = [
        'owner_name','from','end','schedule_id'
    ];

    protected $hidden = [
        'schedule_id', 'schedule_digest','created_at','updated_at'
    ];

    public function color(){
        return $this->belongsTo('App\Models\ReservationColor');
    }

    public function schedule(){
        return $this->belongsTo('App\Models\Schedule');
    }

}
