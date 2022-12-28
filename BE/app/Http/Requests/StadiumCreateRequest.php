<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StadiumCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user_role = auth('api')->user()->role;
        if($user_role == 1)
        {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|unique:stadia',
            'shape' => 'required|string',
            'total_number_of_seats' => 'required|integer',
            'number_of_rows_in_vip' => 'required|integer|max:50000',
            'number_seats_per_row'  => 'required|integer|max:50000'
        ];
    }
}