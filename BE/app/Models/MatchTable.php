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
        'lineman_2',
        'stadium_id'
    ];


    static public function get_stadium($match_id){
        $stadium_id = MatchTable::find($match_id)->stadium_id;
        return Stadium::find($stadium_id);
    }
}
