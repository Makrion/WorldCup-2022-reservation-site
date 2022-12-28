<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MatchCreateRequest extends FormRequest
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
        $min_match_date = time() + 86400;  //min 1-day before
        return [
            'team_1' => 'required|integer|max:32|min:1',
            'team_2' => 'required|integer|max:32|min:1|different:team_1',
            'main_ref' => 'required|string',
            'lineman_1' => 'required|string',
            'lineman_2' => 'required|string',
            'match_date' => "required|integer|min:$min_match_date",
            'stadium_id' => 'required|exists:stadia,id'
        ];
    }
}
