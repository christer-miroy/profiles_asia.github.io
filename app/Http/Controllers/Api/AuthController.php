<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // signup
    public function signup(SignupRequest $request) {
        // actual validated data from SignupRequest
        $data = $request->validated();

        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        ]);

        // create token
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    // login
    public function login(LoginRequest $request) {
        // validated data from LoginRequest
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Incorrect credentials',
            ], 422);
        }

        // success
        $user = Auth::user();

        // create token
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    // logout
    public function logout(Request $request) {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
