<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;

use App\Models\Admin;
use App\Models\Schedule;

class ReservationTest extends TestCase
{

    use RefreshDatabase;

    private $schedule;
    private $admin;

    protected function setUp():void{
        parent::setUp();

        $this->seed('ReservationColorTableSeeder');

        $this->admin = factory(Admin::class)->create();
        $this->schedule = factory(Schedule::class)->create([
            'owner_id' => $this->admin->id
        ]);

    }

    protected function tearDown() :void {

        Artisan::call('migrate:refresh');
        
        parent::tearDown();
    }

    public function testStoreReservation(){
        $this->get('/'.$this->schedule->hash_digest)->assertStatus(200);
        $response = $this->postJson('/reservations',[
            'hash_digest' => $this->schedule->hash_digest,
            'owner_name' => '山田太郎',
            'from' => date('Y-m-d H:i:00',time() + 3600),
            'end' => date('Y-m-d H:i:00',time() + 3600*30),
            'color' => 1
        ])
        ->assertStatus(200);
    }
}
