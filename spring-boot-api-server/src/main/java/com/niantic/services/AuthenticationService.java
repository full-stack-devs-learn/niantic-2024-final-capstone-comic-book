package com.niantic.services;

import com.niantic.models.User;
import com.niantic.models.authentication.LoginDto;
import com.niantic.models.authentication.LoginResponseDto;
import com.niantic.models.authentication.RegisterUserDto;

public interface AuthenticationService
{
    LoginResponseDto login(LoginDto loginDto);

    User register(RegisterUserDto registerUserDto);
}
