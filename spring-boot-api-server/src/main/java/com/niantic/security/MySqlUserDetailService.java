package com.niantic.security;

import com.niantic.data.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MySqlUserDetailService implements UserDetailsService
{
    private final UserDao userDao;

    @Autowired
    public MySqlUserDetailService(UserDao userDao)
    {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        var user = userDao.getByUserName(username);
        if (user == null)
            throw new UsernameNotFoundException(username);

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}
