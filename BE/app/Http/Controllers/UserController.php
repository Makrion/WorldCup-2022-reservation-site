<?php

namespace App\Http\Controllers;

use App\Http\Misc\Traits\WebServiceResponse;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;

class UserController extends Controller
{
    use WebServiceResponse;

    public function register(UserRegisterRequest $request)
    {
        $request_validated = $request->validated();
        $userService = new UserService();
        $nationality = null;
        if(array_key_exists('nationality', $request_validated)){
            $nationality = $request_validated['nationality'];
        }
        
        $user = $userService->register(
            $request_validated['username'],
            $request_validated['password'],
            $request_validated['email'],
            $request_validated['first_name'],
            $request_validated['last_name'],
            $request_validated['birth_date'],
            $request_validated['gender'],
            $request_validated['role'],
            $nationality
        );
        if (!$user) {
            return $this->errorResponse('not found', '404');
        }

        $userService->grantAccessToken($user);

        return $this->generalResponse(new UserResource($user), "200");
    }

    public function login(UserLoginRequest $request)
    {
        $request_validated = $request->validated();
        $userService = new UserService();
        $user = $userService->checkLoginCredentials($request_validated['username'], $request_validated['password']);
        if (!$user) {
            return $this->errorResponse('incorrect username or password', '422');
        }
        $userService->grantAccessToken($user);
        return $this->generalResponse(new UserResource($user), '200');
    }

    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->token()) {
            $request->user()->token()->delete();
            return $this->generalResponse('Successful response', '200');
        }
        return $this->errorResponse('not found', '404');
    }
    
    public function update(UserUpdateRequest $request)
    {
        $userService = new UserService();
        $user = $request->user();
        $match = $userService->checkLoginCredentials($user->username, $request->old_password);
        if ($match) {
            $userService->update(
            $user,
            $request->password,
            $request->first_name,
            $request->last_name,
            $request->birth_date,
            $request->gender,
            $request->nationality
            );
            return $this->generalResponse( "Successful response", '200');
        }

        return $this->errorResponse('wrong old password', '422');
    }
}
