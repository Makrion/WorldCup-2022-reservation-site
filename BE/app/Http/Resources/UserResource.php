<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $res = [
            'id' => $this->id,
            'is_verified' => ($this->email_verified_at != null),
            'role' => $this->role,
            'username' =>  $this->username,
            'email' => $this->email,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'birth_date' => $this->birth_date,
            'gender' => $this->gender,
            'nationality' => $this->nationality
        ];
        if($this->token()){
            $res['access_token'] = $this->token();
        }
        return $res;
    }
}
