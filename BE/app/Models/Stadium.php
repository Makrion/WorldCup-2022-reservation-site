<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'shape',
        'total_number_of_seats',
        'number_of_rows_in_vip',
        'number_seats_per_row'
    ];
}
