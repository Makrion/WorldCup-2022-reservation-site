<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class UserRegisterRequest extends FormRequest
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
        $roles = array(1,2);
        return [
            'username' => 'required|string|unique:users',
            'password' => ['required', 'string', Password::min(8)],
            'last_name' => 'required|string',
            'birth_date' => 'required|integer',
            'gender' => ['required', Rule::in($genders)],
            'email' => 'required|email',
            'role' => ['required', Rule::in($roles)],
            'nationality' => 'string|nullable'
        ];
    }
}
