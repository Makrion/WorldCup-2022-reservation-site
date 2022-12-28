<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stadium;
use App\Http\Resources\StadiumCollection;
use App\Http\Resources\StadiumResource;
use App\Http\Misc\Traits\WebServiceResponse;
use App\Http\Requests\IndexRequest;
use App\Http\Requests\StadiumCreateRequest;
class StadiumController extends Controller
{
    use WebServiceResponse;
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function index(IndexRequest $request)
    {
        $request_validated = $request->validated();

        $request->merge(['page' => $request_validated['current_page']]);

        $matches = Stadium::orderBy('id', 'asc')
                            ->Paginate($request_validated['page_size']);

        return $this->generalResponse( new StadiumCollection($matches), '200');
    }
    /*--------------------------------------------------------------------------------------------------------------------------------------- */
    public function create(StadiumCreateRequest $request)
    {
        $request_validated = $request->validated();

        $stadium = Stadium::create([
            'name' => $request_validated['name'],
            'shape' => $request_validated['shape'],
            'total_number_of_seats' => $request_validated['total_number_of_seats'],
            'number_of_rows_in_vip' => $request_validated['number_of_rows_in_vip'],
            'number_seats_per_row' => $request_validated['number_seats_per_row']
            ]);
        if(!$stadium){
            return $this->messageResponse('could not create such match', '500');
        }

        return $this->generalResponse(  new StadiumResource($stadium), '200');
    }
}
