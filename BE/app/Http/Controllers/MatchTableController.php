<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MatchTable;
use App\Http\Resources\MatchTableResource;
use App\Http\Resources\MatchCollection;
use App\Http\Misc\Traits\WebServiceResponse;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\MatchCreateRequest;
use App\Http\Requests\MatchUpdateRequest;

class MatchTableController extends Controller
{
    use WebServiceResponse;
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function index(IndexRequest $request)
    {
        $request_validated = $request->validated();

        $request->merge(['page' => $request_validated['current_page']]);

        $matches = MatchTable::where('match_date','>', (time() - (2*3600)))
                            ->orderBy('match_date', 'asc')
                            ->Paginate($request_validated['page_size']);

        return $this->generalResponse( new MatchCollection($matches), '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function show($id)
    {
        if(!is_numeric($id)){
            return $this->messageResponse('wrong match id was sent', '422');
        }
        $match = MatchTable::find((int)$id);
        if(!$match){
            return $this->messageResponse('no such match with that id', '422');
        }

        return $this->generalResponse( new MatchTableResource($match), '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function create(MatchCreateRequest $request)
    {
        $request_validated = $request->validated();
        // check no one of the teams has a match today
        $t_1 = $request_validated['team_1'];
        $t_2 = $request_validated['team_2'];
        $date = $request_validated['match_date'];
        if($this->team_cannot_play($t_1, $t_2, $date)){
            return $this->messageResponse('a team can not have more than one game in the same day', '422');
        }
        $match = MatchTable::create([
            'team_1' => $request_validated['team_1'],
            'team_2' => $request_validated['team_2'],
            'match_date' => $request_validated['match_date'],
            'main_ref' => $request_validated['main_ref'],
            'lineman_1' => $request_validated['lineman_1'],
            'lineman_2' => $request_validated['lineman_2'],
            'stadium_id' => $request_validated['stadium_id']
            ]);

        return $this->generalResponse(  new MatchTableResource($match), '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function update(MatchUpdateRequest $request, $id)
    {
        if(!is_numeric($id)){
            return $this->messageResponse('wrong match id was sent', '422');
        }
        $match = MatchTable::find((int)$id);
        if(!$match){
            return $this->messageResponse('no such match with that id', '422');
        }
        $request_validated = $request->validated();
        $team_1 = $request_validated['team_1'] ?? $match->team_1;
        $team_2 = $request_validated['team_2'] ?? $match->team_2;
        $main_ref = $request_validated['main_ref'] ?? $match->main_ref;
        $lineman_1 = $request_validated['lineman_1'] ?? $match->lineman_1;
        $lineman_2 = $request_validated['lineman_2'] ?? $match->lineman_2;
        $match_date = $request_validated['match_date'] ?? $match->match_date;
        $stadium_id = $request_validated['stadium_id'] ?? $match->stadium_id;

        if($this->team_cannot_play($team_1, $team_2, $match_date, $match->id)){
            return $this->messageResponse('one of the teams has another match on that day', '422');
        }

        $match->update([
            'team_1' => $team_1,
            'team_2' => $team_2,
            'main_ref' => $main_ref,
            'lineman_1' => $lineman_1,
            'lineman_2' => $lineman_2,
            'match_date' => $match_date,
            'stadium_id' => $stadium_id
                    ]);

        return $this->generalResponse( new MatchTableResource($match), '200');
    }


    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    private function team_cannot_play($t_1, $t_2, $date, $match_id = null){
        $min_date = strtotime("tomorrow", $date) - (24*3600);
        $max_date = strtotime("tomorrow", $date) - (1);

        if($match_id)
        {
            $match = MatchTable::where('match_date','>=', $min_date)
            ->where('match_date', '<=', $max_date)
            ->where('id', '!=', $match_id)
            ->where(function($query) use($t_1, $t_2){
                $query->where('team_1', $t_1)
                    ->orwhere('team_1', $t_2)
                    ->orwhere('team_2', $t_1)
                    ->orwhere('team_2', $t_2);
                                                })->first();
        }
        else{
            $match = MatchTable::where('match_date','>=', $min_date)
            ->where('match_date', '<=', $max_date)
            ->where(function($query) use($t_1, $t_2){
                $query->where('team_1', $t_1)
                    ->orwhere('team_1', $t_2)
                    ->orwhere('team_2', $t_1)
                    ->orwhere('team_2', $t_2);
                                                })->first();
        }


        if($match){
            return true;
        }
        return false;
    }
}
