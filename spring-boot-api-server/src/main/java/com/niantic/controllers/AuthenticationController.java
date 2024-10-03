package com.niantic.controllers;

import com.niantic.exceptions.DuplicateResourceException;
import com.niantic.exceptions.ResourceNotFoundException;
import com.niantic.security.jwt.JwtUtil;
import com.niantic.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.niantic.data.UserDao;
import com.niantic.models.authentication.LoginDto;
import com.niantic.models.authentication.LoginResponseDto;
import com.niantic.models.authentication.RegisterUserDto;
import com.niantic.models.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class AuthenticationController
{
    private final AuthenticationService authenticationService;



    @Autowired
    public AuthenticationController(AuthenticationService authenticationService)
    {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto)
    {
        try
        {
            var response = authenticationService.login(loginDto);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer " + response.getToken());

            return ResponseEntity.ok().headers(httpHeaders).body(response);
        }
        catch (ResourceNotFoundException | AuthenticationException e)
        {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(errors);
        }
        catch (Exception ex)
        {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", "Oops... something went wrong on our end");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUserDto newUser)
    {
        try
        {
            var user = authenticationService.register(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }
        catch(DuplicateResourceException e)
        {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errors);
        }
        catch (Exception e)
        {
            Map<String, String> errors = new HashMap<>();
            errors.put("message", "Oops... something went wrong on our end");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errors);
        }
    }

}

