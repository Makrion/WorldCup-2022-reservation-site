<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\MatchTable;
use App\Http\Resources\MatchTableResource;
use App\Http\Resources\TicketCollection;
use App\Http\Misc\Traits\WebServiceResponse;
use App\Http\Requests\IndexRequest;
use App\Http\Resources\TicketResource;
use App\Http\Requests\TicketDeleteRequest;
use App\Http\Requests\TicketCreateRequest;
use App\Models\Tickets;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    use WebServiceResponse;
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function index(IndexRequest $request)
    {
        $request_validated = $request->validated();

        $request->merge(['page' => $request_validated['current_page']]);

        $matches = Tickets::orderBy('reservation_date', 'desc')
                            ->Paginate($request_validated['page_size']);

        return $this->generalResponse( new TicketCollection($matches), '200');
    }

    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function create(TicketCreateRequest $request)
    {
        $request_validated = $request->validated();
        $can = $this->can_reserve($request_validated);
        if($can == 1){
            return $this->messageResponse('sorry, there are no normal seats empty in that match', '422');
        }
        elseif($can == 2){
            return $this->messageResponse('sorry, that seat is taken', '422');
        }
        elseif($can == -1){
            return $this->messageResponse('sorry, that seat is invalid, there is no such seat', '422');
        }
        $ticket = Tickets::create([
            'user_id' => $request->user()->id,
            'match_id' => $request_validated['match_id'],
            'reservation_date' => time(),
            'seat' => $request_validated['seat'],
            'seat_row' => $request_validated['seat_row'] ?? null,
            'seat_number' => $request_validated['seat_number'] ?? null,
            'ticket_number' => Str::uuid()
            ]);

        if(!$ticket){
            return $this->messageResponse('could not reserve such ticket', '500');
        }
        return $this->generalResponse(  new TicketResource($ticket), '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function delete(TicketDeleteRequest $request)
    {
        $request_validated = $request->validated();
        $user = auth('api')->user();

        # check if it's mine
        $ticket = Tickets::where('ticket_number', '=', $request_validated['ticket_number'])
                               ->where('user_id', '=', ($user->id))->first();
        if(!$ticket){
            return $this->messageResponse('this ticket_number is not yours', '422');
        }
        
        # check if i can delete it
        $date_diff = $ticket->get_match_date() - time();
        if($date_diff <= 259200){       # 60*60*24*3
            return $this->messageResponse('sorrry, you can cancel a reserved ticket only 3 days before the start of the event.', '422');
        }
        
        Tickets::where('ticket_number', '=', $request_validated['ticket_number'])
                ->where('user_id', '=', ($user->id))->delete();
        return $this->messageResponse( "Successful response", '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    private function can_reserve($vr){
        $stadium = MatchTable::get_stadium($vr['match_id']);
        $max_vip = $stadium->number_of_rows_in_vip * $stadium->number_seats_per_row;
        $max_norm = $stadium->total_number_of_seats - $max_vip;
        if($vr['seat'] == 'norm'){
            $st = Tickets::is_norm_seat_empty($vr['match_id'], $max_norm);
            if($st){
                return 0;
            }
            return 1;
        }
        if(!Tickets::is_that_valid_vip($vr['match_id'], $vr['seat_row'], $vr['seat_number'])){
            return -1;
        }
        $st = Tickets::is_vip_seat_empty($vr['match_id'], $vr['seat_row'], $vr['seat_number']);
        if($st){
            return 0;
        }
        return 2;
    }
}


/*
      'user_id',
        'match_id',
        'reservation_date',
        'seat',
        'seat_row',
        'seat_number',
        'ticket_number',  #uuid



            'match_id' => 'required|exists:match_tables,id',
            'seat' =>  ['required', Rule::in($seats)],
            'seat_row' => 'integer',
            'seat_number' => 'integer'


                    'team_1',
        'team_2',
        'match_date',
        'main_ref',
        'lineman_1',
        'lineman_2',
        'stadium_id'


                'total_number_of_seats',
        'number_of_rows_in_vip',
        'number_seats_per_row'
 */