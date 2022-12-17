<?php

namespace App\Http\Misc\Traits;

trait WebServiceResponse
{
    // ok this is not found??
    public function messageResponse($error, $code = 422)
    {
        $msg = [
            "message" => $error
        ];
        return $this->generalResponse( $msg, $code);
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