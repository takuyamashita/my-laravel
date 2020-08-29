<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Artisan;
use App\Models\Admin;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;

class ScheduleStoreTest extends TestCase
{
    
    use RefreshDatabase;

    const adminId = 1;

    protected $admin;

    protected function setUp():void{
        parent::setUp();

        $this->seed('ReservationColorTableSeeder');

        $this->admin = factory(Admin::class)->create([
            'id' => self::adminId
        ]);

    }

    protected function tearDown() :void {
        Artisan::call('migrate:fresh');
        parent::tearDown();
    }

    public function testStoreSchedule(){

        $response = $this->actingAs($this->admin,'web')
            ->postJson('/schedules',[
            'name' => 'test',
            'description' => 'large room',
            'password_required' => true,
            'permit_required' => false,
            'schedule_passwords' => [
                [
                    'colors' => [1,3,5],
                    'schedule_password' => 'password'
                ]

            ]
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('schedules',[
            'owner_id' => self::adminId,
            'name' => 'test',
            'description' => 'large room',
            'password_required' => true,
            'permit_required' => false,
        ]);
        $this->assertDatabaseHas('schedule_passwords',[
            'password' => 'password',
        ]);
        
    }

    public function testStoreScheduleValidationError(){
        $response = $this->actingAs($this->admin,'web')
            ->postJson('/schedules',[
                'name' => '',
                'description' => 'large room',
                'password_required' => true,
                'permit_required' => false,
                'schedule_passwords' => [
                    [
                        'colors' => [1,3,5,50],
                        'schedule_password' => ''
                    ]

                ]
            ]);
        $response->assertStatus(422)
            ->assertJson([
                'errors' => [
                    'name' => [
                        'タイトルが設定されていません'
                    ],
                    'schedule_passwords.0.schedule_password' => [
                        'パスワードが入力されていません'
                    ],
                ]
            ]);
    }

    public function testSeeSchedule(){
        $schedule = new Schedule();
        $this->actingAs($this->admin,'web')
            ->postJson('/schedules',[
                'name' => 'test',
                'description' => 'large room',
                'password_required' => true,
                'permit_required' => false,
                'schedule_passwords' => [
                    [
                        'colors' => [1,3,5],
                        'schedule_password' => 'test'
                    ]

                ]
            ]);
        $this->get('/'.$schedule->find(1)->hash_digest)
            ->assertStatus(200);
        
        $this->postJson('/'.$schedule->find(1)->hash_digest,[
            'schedule_password' => 'fdsafdsa'
        ])->assertStatus(422)
        ->assertJson([
            'error' => 'パスワードが違います'
        ]);

        $this->postJson('/'.$schedule->find(1)->hash_digest,[
            'schedule_password' => 'test'
        ])->assertStatus(200)
        ->assertJson([
            'name' => 'test'
        ]);

        $this->actingAs($this->admin,'web')
            ->postJson('/'.$schedule->find(1)->hash_digest,[
                'schedule_password' => 'test',
            ])
            ->assertStatus(200)
            ->assertJson([
                'owner' => true
            ]);

        $this->actingAs(factory(Admin::class)->create(),'web')
            ->postJson('/'.$schedule->find(1)->hash_digest,[
                'schedule_password' => 'test',
            ])
            ->assertStatus(200)
            ->assertJson([
                'owner' => false
            ]);
    }

}
