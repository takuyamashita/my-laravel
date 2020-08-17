<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulePasswordReservationColorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_color_schedule_password', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('schedule_password_id')->unsigned();
            $table->bigInteger('reservation_color_id')->unsigned();
            $table->foreign('schedule_password_id')->references('id')->on('schedule_passwords')->onDelete('cascade');
            $table->foreign('reservation_color_id')->references('id')->on('reservation_colors')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_password_reservation_color');
    }
}
