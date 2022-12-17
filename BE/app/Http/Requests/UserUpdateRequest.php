<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        $genders = array('m' ,'f');
        $min_birth_date = strtotime("1920-1-1");
        $max_birth_date = strtotime("2018-1-1");
        return [
            'old_password' => 'required',
            'password' => ['string', Password::min(8)],
            'first_name' => 'string',
            'last_name' => 'string',
            'birth_date' => "integer|min:$min_birth_date|max:$max_birth_date",
            'gender' => [Rule::in($genders)],
            'nationality' => 'string|nullable'
        ];
    }
}
