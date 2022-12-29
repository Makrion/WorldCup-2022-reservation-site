<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tickets extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'match_id',
        'reservation_date',
        'seat',
        'seat_row',
        'seat_number',
        'ticket_number',  #uuid
    ];
    /********************************************************************************************************************/
    public function get_match_date()
    {
        $match = MatchTable::find($this->match_id);
        return $match->match_date;
    }
    /********************************************************************************************************************/
    static public function get_reserved_seats(int $match_id)
    {
        $res = Tickets::where('match_id', '=', $match_id)
                    ->count();
        return $res;
    }
    /********************************************************************************************************************/
    static public function is_norm_seat_empty(int $match_id, int $max_norm)
    {
        $norm_count = Tickets::where('match_id', '=', $match_id)
                    ->where('seat', '=', 'norm')
                    ->count();
        if($norm_count < $max_norm){
            return true;
        }
        return false;
    }
    /********************************************************************************************************************/
    static public function is_that_valid_vip(int $match_id, int $seat_row, int $seat_number)
    {
        $stadium = MatchTable::get_stadium($match_id);
        if($stadium->number_of_rows_in_vip < $seat_row  ||  $stadium->number_seats_per_row < $seat_number){
            return false;
        }
        return true;
    }
    /********************************************************************************************************************/    
    static public function is_vip_seat_empty(int $match_id, int $seat_row, int $seat_number)
    {
        $count = Tickets::where('match_id', '=', $match_id)
                    ->where('seat', '=', 'vip')
                    ->where('seat_row', '=', $seat_row)
                    ->where('seat_number', '=', $seat_number)
                    ->count();
        if($count > 0){
            return false;
        }
        return true;
    }
    /********************************************************************************************************************/
    static public function get_reserved_vip_seats(int $match_id)
    {
        $res = Tickets::where('match_id', '=', $match_id)
                    ->where('seat', '=', 'vip')
                    ->select('seat_row', DB::raw('group_concat(DISTINCT seat_number) as seat_number'))
                    ->groupBy('seat_row')
                    ->orderBy('seat_row', 'asc')
                    ->orderBy('seat_number', 'asc')->get();
        foreach($res as &$r){
            $r['seat_number'] = array_map('intval', explode(',', $r['seat_number']));
        }
        return $res;
    }
}
