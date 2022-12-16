<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{

    public function register(UserRegisterRequest $request)
    {
        $userService = new UserService();
        $blogService = new BlogService();
        $unique = $blogService->uniqueBlog($request->blog_username);
        if (!$unique) {
            return $this->errorResponse(Errors::MISSING_BLOG_USERNAME, '422');
        }
        $user = $userService->register(
            $request->email,
            $request->password,
            $request->age,
            false,
            $request->blog_username
        );
        if (!$user) {
            return $this->errorResponse('not found', '404');
        }

        $userService->grantAccessToken($user);

        return $this->generalResponse(new UserResource($user), "Successful response", "200");
    }
    
}
