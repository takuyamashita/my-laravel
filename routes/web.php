<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('top');
});

Route::prefix('myschedule')->group(function(){
    Route::get('/','ScheduleController@userScheduleManageReact')->name('schedule.top')->middleware('auth:web');
    Route::get('/make','ScheduleController@userScheduleManageReact')->middleware('auth:web');
});

Route::get('/reservation/color',function(){
    return response()->json(\App\Models\ReservationColor::all());
})->middleware('auth:web');

Route::resource('schedules','ScheduleCrudController')->only(['store','update','index']);

Route::resource('reservations','ReservationCrudController')->only(['store','destroy','update']);

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/{schedule}','ScheduleController@openScheduleManageReact');

Route::post('/{schedule}','ScheduleController@getOpenSchedule');
