<?php

namespace App\Http\Misc\Traits;

trait WebServiceResponse
{
    // ok this is not found??
    public function errorResponse($error, $code = 422)
    {
        return $this->generalResponse( $error, $code);
    }

    public function generalResponse($data = "", $status_code = "200")
    {
        if ($data != "") {
            return response()->json($data, $status_code);
        } else {
            return response()->json("", $status_code);
        }
    }
}