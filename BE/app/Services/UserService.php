<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;

class UserService
{
    public function register(string $email, string $password, int $age, string $username)
    {
        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password),
            'age' => $age,
            'linked_by_google' => 'isLinkedByGoogle',
            'google_id' => 'googleId'
            ]);


        return $user;
    }

    public function checkLoginCredentials(string $email, string $password)
    {
        $user = User::where('email', $email)->first();
        if (!$user || !Hash::check($password, $user->password)) {
            $user = null;
        }
        return $user;
    }


    public function grantAccessToken(User $user)
    {
        if (!$user) {
            return false;
        }
        $token = $user->createToken('Auth Token')->accessToken;
        $user->withAccessToken($token);
        return true;
    }

    public function verifyUserEmail(User $user, bool $resend)
    {
        if (!$user) {
            return false;
        }
        if (! $user->hasVerifiedEmail()) {
            if ($resend) {
                $user->sendEmailVerificationNotification();
                return true;
            }
            $user->markEmailAsVerified();
            event(new Verified($user));
            return true;
        }
        return false;
    }




    public function uniqueEmail(string $email)
    {
        if (User::where('email', $email)->count() > 0) {
            return false;
        }
        return true;
    }
}