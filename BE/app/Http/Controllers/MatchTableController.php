<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MatchTable;
use App\Http\Resources\MatchTableResource;
use App\Http\Resources\MatchCollection;
use App\Http\Misc\Traits\WebServiceResponse;
use App\Http\Requests\IndexRequest;

class MatchTableController extends Controller
{
    use WebServiceResponse;

    public function index(IndexRequest $request)
    {
        $request_validated = $request->validated();

        $request->merge(['page' => $request_validated['current_page']]);

        $matches = MatchTable::where('match_date','>', (time() - (2*3600)))
                            ->orderBy('match_date', 'asc')
                            ->Paginate($request_validated['page_size']);

        return $this->generalResponse( new MatchCollection($matches), '200');
    }

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
}
