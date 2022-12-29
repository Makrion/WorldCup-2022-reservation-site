<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
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
            'user_id' => $this->user_id,
            'match_id' => $this->match_id,
            'reservation_date' => $this->reservation_date,
            'seat' => $this->seat,
            'seat_row' => $this->seat_row,
            'seat_number' => $this->seat_number,
            'ticket_number' => $this->ticket_number
        ];

        return $res;
    }
}
