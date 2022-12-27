<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Stadium;
use App\Models\Tickets;

class MatchTableResource extends JsonResource
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
            'main_ref' => $this->main_ref,
            'lineman_1' => $this->lineman_1,
            'lineman_2' => $this->lineman_2,
            'match_date' => $this->match_date,
            'stadium_name' => $stadium->name,
            'stadium_shape' => $stadium->shape,
            'no_total_seats' => $stadium->total_number_of_seats,
            'no_rows_in_vip' => $stadium->number_of_rows_in_vip,
            'no_seats_per_row' => $stadium->number_seats_per_row,
            'no_reserved_seats' => Tickets::get_reserved_seats($this->id),
            'reserved_vip_seats'=> Tickets::get_reserved_vip_seats($this->id)
        ];

        return $res;
    }
}