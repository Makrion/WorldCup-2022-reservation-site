<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchTable extends Model
{
    use HasFactory;


    protected $fillable = [
        'team_1',
        'team_2',
        'match_date',
        'main_ref',
        'lineman_1',
        'lineman_2'
    ];
}
