<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tickets extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_date',
        'seat',
        'seat_row',
        'seat_number',
        'ticket_number',
        'user_id',
        'match_id'
    ];
}
