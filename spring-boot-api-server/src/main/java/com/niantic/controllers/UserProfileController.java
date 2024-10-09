package com.niantic.controllers;

import com.niantic.data.UserDao;
import com.niantic.data.UserProfileDao;
import com.niantic.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user-profile")
public class UserProfileController {

    private final UserProfileDao userProfileDao;
    private final UserDao userDao;

    @Autowired
    public UserProfileController(UserProfileDao userProfileDao, UserDao userDao) {
        this.userProfileDao = userProfileDao;
        this.userDao = userDao;
    }
    
    @GetMapping("/my-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getMyProfile(Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        UserProfile userProfile = userProfileDao.getUserProfileByUserId(userId);
        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<UserProfile>> getAllUserProfiles() {
        List<UserProfile> profiles = userProfileDao.getAllUserProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable int userId) {
        UserProfile profile = userProfileDao.getUserProfileByUserId(userId);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/email/{email}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserProfile> getUserProfileByEmail(@PathVariable String email, Principal principal) {
        UserProfile userProfile = userProfileDao.getUserProfileByEmail(email);
        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createUserProfile(Principal principal, @RequestBody UserProfile userProfile) {
        int userId = userDao.getIdByUsername(principal.getName());

        if (userProfileDao.getUserProfileByUserId(userId) == null) {
            userProfile.setUserId(userId);
            userProfileDao.addUserProfile(userProfile);
            return ResponseEntity.ok("User profile created successfully.");
        }
        return ResponseEntity.badRequest().body("Profile for this user already exists.");
    }

    @PutMapping("/my-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateMyProfile(Principal principal, @RequestBody UserProfile updatedProfile) {
        int userId = userDao.getIdByUsername(principal.getName());

        UserProfile existingProfile = userProfileDao.getUserProfileByUserId(userId);
        if (existingProfile != null) {
            userProfileDao.updateUserProfile(userId, updatedProfile);
            return ResponseEntity.ok("User profile updated successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteUserProfile(@PathVariable int userId) {
        UserProfile existingProfile = userProfileDao.getUserProfileByUserId(userId);
        if (existingProfile != null) {
            userProfileDao.deleteUserProfile(userId);
            return ResponseEntity.ok("User profile deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
