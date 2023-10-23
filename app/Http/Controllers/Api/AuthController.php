<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Traits\CommonTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    use CommonTrait;

    // -------------LOGIN-----------------
    public function login(Request $request)
    {
        $validation= Validator::make($request->all(), 
        [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validation->fails()){
            $errors=$validation->errors();
            return $this->sendError($errors,'');
        }

        if(!Auth::attempt($request->only(['email', 'password']))){
            return $this->sendError('Invalid Credentials','');
        }
        $user = User::where('email', $request->email)->first();
        $data['user'] = $user;
        $data['token'] = $user->createToken("API TOKEN")->plainTextToken;
        return $this->sendSuccess('Logged In Successfully',$data);
    }
}
    
