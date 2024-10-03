package com.niantic.services;

import com.niantic.data.UserDao;
import com.niantic.exceptions.DuplicateResourceException;
import com.niantic.exceptions.ResourceNotFoundException;
import com.niantic.models.User;
import com.niantic.models.authentication.LoginDto;
import com.niantic.models.authentication.LoginResponseDto;
import com.niantic.models.authentication.RegisterUserDto;
import com.niantic.security.jwt.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class JwtAuthenticationService implements AuthenticationService
{

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserDao userDao;

    public JwtAuthenticationService(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil, UserDao userDao)
    {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.userDao = userDao;
    }

    @Override
    public LoginResponseDto login(LoginDto loginDto)
    {
        User user = userDao.getByUserName(loginDto.getUsername());

        if (user == null)
        {
            throw new ResourceNotFoundException(loginDto.getUsername() + " does not exist");
        }

        var authToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        authenticationManager.authenticate(authToken);


        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        return new LoginResponseDto(jwt, user);
    }

    @Override
    public User register(RegisterUserDto registerUserDto)
    {
        boolean exists = userDao.exists(registerUserDto.getUsername());
        if (exists)
        {
            throw new DuplicateResourceException(registerUserDto.getUsername() + " already exists");
        }
        // create user
        return userDao.create(new User(0, registerUserDto.getUsername(), registerUserDto.getPassword()));
    }
}
