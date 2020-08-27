<?php

namespace App\Http\Requests;

use App;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Reservation;
use App\Models\Schedule;
use App\Http\Services\ReservationService;
use Illuminate\Contracts\Validation\Validator;

class ReservationStoreRequest extends FormRequest
{
    protected $reservationService;

    public function __construct(ReservationService $reservationService){
        $this->reservationService = $reservationService;
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {   
        return $this->reservationService->authorizeWithPassword();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'hash_digest' => ['required','exists:App\Models\Schedule,hash_digest'],
            'owner_name' => ['required','max:30'],
            'from' => ['required','date','after:now'],
            'end' => ['required','date','after:from'],
            'color' => ['required','integer']
        ];
    }

    public function messages(){
        return [
            'owner_name.*' => '1文字以上を入力',
            'from.*' => '予約は現在より先に設定してください',
            'end.*' => '予約は開始日時より先に設定してください',
        ];
    }

    public function withValidator($validator){
        $validator->after(function ($validator){
            
            $colors = $this->reservationService->getAvailableColor();
            
            $reservations = $this->reservationService->getSchedule()->permitReservations();
            
            $isIdInclude = false;
            
            foreach($colors as $key => $value){
                $a[] = $value->id;
                if((int)$this->input('color') === $value->id) $isIdInclude = true;
            }

            $overReservations = $reservations
                ->where(function($query){
                    $query
                    ->where('from','<',$this->input('end'))
                    ->where('end','>',$this->input('from'));
                });

            if(!$isIdInclude) $validator->errors()->add('color', '色を選択して下さい');
            if($overReservations->exists()){
                $validator->errors()->add('over','重複している予約があります');
                $validator->errors()->add('date_over',$overReservations->with('color')->get());
            }
        });
    }

    protected function failedValidation(Validator $validator){
        $validator->errors()->add('dummyId',$this->input('dummyId'));
        parent::failedValidation($validator);
    }
}
