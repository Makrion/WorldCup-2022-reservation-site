<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TicketCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user_role = auth('api')->user()->role;
        if($user_role == 2)
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
        $seats = ['norm', 'vip'];
        $user = auth('api')->user();
        return [
            'match_id' => 'required|exists:match_tables,id',
            'seat' =>  ['required', Rule::in($seats)],
            'seat_row' => ['integer', Rule::requiredIf(function() {
                return $this->request->get('seat') == 'vip';
            })],
            'seat_number' => ['integer', Rule::requiredIf(function() {
                return $this->request->get('seat') == 'vip';
            })]
        ];
    }
}
