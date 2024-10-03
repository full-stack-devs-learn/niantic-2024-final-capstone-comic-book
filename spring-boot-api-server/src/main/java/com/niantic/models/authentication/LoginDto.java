package com.niantic.models.authentication;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDto
{
   private String username;
   private String password;

}
