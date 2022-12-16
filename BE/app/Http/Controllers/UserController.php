<?php

namespace App\Http\Controllers;

use App\Http\Misc\Traits\WebServiceResponse;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;

class UserController extends Controller
{
    use WebServiceResponse;

    public function register(UserRegisterRequest $request)
    {
        $userService = new UserService();
        $user = $userService->register(
            $request->username,
            $request->password,
            $request->email,
            $request->first_name,
            $request->last_name,
            $request->birth_date,
            $request->gender,
            $request->role,
            $request->nationality
        );
        if (!$user) {
            return $this->errorResponse('not found', '404');
        }

        $userService->grantAccessToken($user);

        return $this->generalResponse(new UserResource($user), "200");
    }
    
}
