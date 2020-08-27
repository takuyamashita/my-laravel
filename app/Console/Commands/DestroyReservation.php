<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;

class DestroyReservation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:destroy {--dayWidth=30}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'destroy reservations';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $dayWidth = (int) $this->option('dayWidth');

        $end = date('Y-m-d h:m:s',time() - $dayWidth * 60 * 60 * 24);
        
        $this->info($end);

        $reservations = Reservation::where('end','<',$end)->get();

        $this->info(count($reservations));

        foreach($reservations as $reservation){
            $reservation->delete();
        }

    }
}
