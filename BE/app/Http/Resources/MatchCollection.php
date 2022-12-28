<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MatchCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function __construct($resource)
    {
        // Ensure you call the parent constructor
        parent::__construct($resource);
        $this->resource = $resource;
    }

    public function toArray($request)
    {
        $next_page = -1;
        if($this->hasMorePages()) {
            $next_page = $this->currentPage() + 1 ;
        }
        return [
            "users" => MatchResource::Collection($this->collection),
            'count' => $this->count(),
            'next_page' => $next_page
            ];
    }
}
