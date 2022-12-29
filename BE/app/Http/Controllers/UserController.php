<?php

namespace App\Http\Controllers;

use App\Http\Misc\Traits\WebServiceResponse;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserAdminRequest;
use App\Http\Requests\UserAdminIndexRequest;
use App\Models\User;

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
            return $this->messageResponse('not found', '404');
        }
        //verify users accounts
        if ($user->role == 2){
            $user->markEmailAsVerified();
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
            return $this->messageResponse('incorrect username or password', '422');
        }
        $userService->grantAccessToken($user);
        return $this->generalResponse(new UserResource($user), '200');
    }

    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->token()) {
            $request->user()->token()->delete();
            return $this->messageResponse('Successful response', '200');
        }
        return $this->messageResponse('not found', '404');
    }
    
    public function update(UserUpdateRequest $request)
    {
        $userService = new UserService();
        $user = $request->user();
        $match = $userService->checkLoginCredentials($user->username, $request->old_password);
        if ($match) {
            $new_user = $userService->update(
            $user,
            $request->password,
            $request->first_name,
            $request->last_name,
            $request->birth_date,
            $request->gender,
            $request->nationality
            );
            return $this->generalResponse(new UserResource($new_user), '200');
        }

        return $this->messageResponse('wrong old password', '422');
    }

    public function delete(UserAdminRequest $request)
    {
        $request_validated = $request->validated();
        $user = User::where('id',  $request_validated['user_id'])->first();

        if($user){
            $user->delete();
            return $this->messageResponse( "Successful response", '200');
        }
        return $this->messageResponse('there are no users with that id', '422');
    }

    public function verify(UserAdminRequest $request)
    {
        $request_validated = $request->validated();
        $user = User::where('id',  $request_validated['user_id'])->first();

        if($user){
            if (! $user->hasVerifiedEmail()) {
                $user->markEmailAsVerified();
                return $this->messageResponse( "Successful response", '200');
            }
            return $this->messageResponse('this user is already verified', '422');
        }
        return $this->messageResponse('there are no users with that id', '422');
    }

    public function index(UserAdminIndexRequest $request)
    {
        $request_validated = $request->validated();
        $userService = new UserService();

        $request->merge(['page' => $request_validated['current_page']]);
        $users = $userService->index(false, $request_validated['page_size']);

        return $this->generalResponse( new UserCollection($users), '200');
    }

    public function index_unverified(UserAdminIndexRequest $request)
    {
        $request_validated = $request->validated();
        $userService = new UserService();

        $request->merge(['page' => $request_validated['current_page']]);
        $users = $userService->index(true, $request_validated['page_size']);

        return $this->generalResponse( new UserCollection($users), '200');
    }
}
