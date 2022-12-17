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
    public function register(string $username, string $password, string $email, string $first_name, string $last_name, int $birth_date, string $gender, int $role, $nationality)
    {
        $user = User::create([
            'username' => $username,
            'email' => $email,
            'password' => Hash::make($password),
            'first_name'=> $first_name,
            'last_name' => $last_name, 
            'birth_date' => $birth_date,
            'gender' => $gender,
            'email' => $email,
            'role' => $role,
            'nationality' => $nationality
            ]);
        return $user;
    }

    public function update($user, $password, $first_name, $last_name, $birth_date, $gender, $nationality)
    {
        $user->update([
            'password' => $password ?  Hash::make($password) : $user->password,
            'first_name' => $first_name ?? $user->first_name,
            'last_name' => $last_name ?? $user->last_name,
            'birth_date' =>  $birth_date ?? $user->birth_date,
            'gender' => $gender ?? $user->gender,
            'nationality' =>  $nationality ?? $user->nationality,
                    ]);
        return $user;
    } 

    public function checkLoginCredentials(string $username, string $password)
    {
        $user = User::where('username', $username)->first();
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