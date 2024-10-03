package com.niantic.controllers;

import com.niantic.data.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
public class DemoController
{
    private final UserDao userDao;

    @Autowired
    public DemoController(UserDao userDao)
    {
        this.userDao = userDao;
    }

    @GetMapping("/demo")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> demo()
    {
        var items = new String[]{"milk","potatoes","cheese"};
        return ResponseEntity.ok(items);
    }

    @GetMapping("/demo/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> mustBeAdmin()
    {
        return ResponseEntity.ok("Hello Admin");
    }

    @GetMapping("/demo/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> mustBeUser()
    {
        return ResponseEntity.ok("Hello User");
    }

    @GetMapping("/demo/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> userProfile(Principal principal)
    {
        var user = userDao.getByUserName(principal.getName());
        return ResponseEntity.ok(user);
    }

    @GetMapping("/demo/public")
    public ResponseEntity<?> everyoneAllowed()
    {
        return ResponseEntity.ok("Everyone allowed here");
    }
}
