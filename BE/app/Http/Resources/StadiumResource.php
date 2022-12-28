<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Stadium;

class StadiumResource extends JsonResource
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
            'name' => $this->name,
            'shape' => $this->shape,
            'total_number_of_seats' => $this->total_number_of_seats,
            'number_of_rows_in_vip' => $this->number_of_rows_in_vip,
            'number_seats_per_row' => $this->number_seats_per_row
        ];

        return $res;
    }
}