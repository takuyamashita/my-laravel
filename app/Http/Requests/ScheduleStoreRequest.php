<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\Hankaku;
use App\Models\Schedule;

class ScheduleStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required','max:50',Rule::unique('schedules','name')->where('owner_id',$this->user()->id)],
            'description' => ['max:100'],
            'password_required' => ['boolean'],
            'permit_required' => ['boolean'],
            'schedule_passwords.*.colors.*' => ['exclude_if:password_required,false','exists:App\Models\ReservationColor,id'],
            'schedule_passwords.*.schedule_password' => ['exclude_if:password_required,false','required','max:50', new Hankaku]
        ];
    }

    public function messages(){
        return [
            'name.required' => 'タイトルが設定されていません',
            'name.unique' => 'タイトルが重複しています',
            'schedule_passwords.*.schedule_password.required' => 'パスワードが入力されていません',
        ];
    }

    public function withValidator($validator){
        $validator->after(function ($validator){
            if($this->input('password_required')){
                $passwords = $this->input('schedule_passwords');
                $passwordArray = [];
                foreach($passwords as $key => $passwordObject){
                    $passwordArray[] = $passwordObject['schedule_password'];
                }
                if(count(array_unique($passwordArray)) !== count($passwords)){
                    $validator->errors()->add('schedule_password', 'パスワードが重複しています');
                }
            }
        });
    }
}
