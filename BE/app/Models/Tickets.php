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

    static public function get_reserved_seats(int $match_id)
    {
        $res = Tickets::where('match_id', '=', $match_id)
                    ->count();
        return $res;
    }

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
