<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;

use App\Models\Admin;
use App\Models\Schedule;
use App\Models\SchedulePassword;

class ReservationTest extends TestCase
{

    use RefreshDatabase;

    private $admin;

    protected function setUp():void{
        parent::setUp();

        $this->seed('ReservationColorTableSeeder');

        $this->admin = factory(Admin::class)->create();
    }

    protected function tearDown() :void {

        Artisan::call('migrate:refresh');
        
        parent::tearDown();
    }

    public function testStoreReservation(){
        $schedule = factory(Schedule::class)->create([
            'owner_id' => $this->admin->id,
            'password_required' => false,
            'permit_required' => true,
        ]);

        $this->get('/'.$schedule->hash_digest)->assertStatus(200);
        
        $owner_name = '山田　太郎';
        $from = date('Y-m-d H:i:00',time() + 3600);
        $end = date('Y-m-d H:i:00',time() + 3600 * 30);
        $dummyId = 1;

        $response = $this->postJson('/reservations',[
            'hash_digest' => $schedule->hash_digest,
            'owner_name' => $owner_name,
            'from' => $from,
            'end' => $end,
            'color' => 1,
            'dummyId' => $dummyId,
        ])
        ->assertStatus(200)
        ->assertJson([
            'reservation' => [
                    'owner_name' => $owner_name,
                    'from' => $from,
                    'end' => $end,
                    'status' => 0,
            ],
            'dummyId' => $dummyId
        ]);
        $this->assertDatabaseHas('reservations',[
            'owner_name' => $owner_name,
            'schedule_digest' => $schedule->hash_digest,
            'status' => 0
        ]);

        $schedule = factory(Schedule::class)->create([
            'owner_id' => $this->admin->id,
            'password_required' => true,
            'permit_required' => true,
        ]);

        factory(SchedulePassword::class)->create([
            'schedule_id' => $schedule->id
        ])->colors()->attach([1,2,5]);

        $response = $this->postJson('/reservations',[
            'hash_digest' => $schedule->hash_digest,
            'owner_name' => $owner_name,
            'from' => $from,
            'end' => $end,
            'color' => 1,
            'dummyId' => $dummyId,
            'schedule_password' => $schedule->schedulePasswords()->first()->password,
        ])
        ->assertStatus(200);
    }

    public function testStoreReservationError(){
        $scheduleNeedPassword = factory(Schedule::class)->create([
            'owner_id' => $this->admin->id,
            'password_required' => true,
            'permit_required' => true,
        ]);

        $this->get('/'.$scheduleNeedPassword->hash_digest)->assertStatus(200);
        
        $owner_name = '山田　太郎';
        $from = date('Y-m-d H:i:00',time() + 3600);
        $end = date('Y-m-d H:i:00',time() + 3600 * 30);
        $dummyId = 1;

        $response = $this->postJson('/reservations',[
            'hash_digest' => $scheduleNeedPassword->hash_digest,
            'owner_name' => $owner_name,
            'from' => $from,
            'end' => $end,
            'color' => 1,
            'dummyId' => $dummyId,
        ])
        ->assertStatus(403);
        
        factory(SchedulePassword::class)->create([
            'schedule_id' => $scheduleNeedPassword->id
        ])->colors()->attach([1,2,5]);

        $response = $this->postJson('/reservations',[
            'hash_digest' => $scheduleNeedPassword->hash_digest,
            'owner_name' => $owner_name,
            'from' => $from,
            'end' => $end,
            'color' => 1,
            'dummyId' => $dummyId,
            'schedule_password' => 'fkdla',
        ])
        ->assertStatus(403);
    }
}
