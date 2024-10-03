package com.niantic.models.authentication;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.niantic.models.User;
import lombok.Setter;

@Setter
public class LoginResponseDto
{


    private String token;
    private User user;

    public LoginResponseDto(String token, User user)
    {
        this.token = token;
        this.user = user;
    }

    @JsonProperty("token")
    public String getToken()
    {
        return token;
    }

    @JsonProperty("user")
    public User getUser()
    {
        return user;
    }

}
