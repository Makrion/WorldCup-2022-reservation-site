<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Stadium;

class MatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $stadium = Stadium::find($this->stadium_id);
        $res = [
            'id' => $this->id,
            'team_1' => $this->team_1,
            'team_2' => $this->team_2,
            'stadium_name' => $stadium->name,
            'match_date' => $this->match_date
        ];

        return $res;
    }
}
