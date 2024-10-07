package com.niantic.controllers;

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
public class UserProfileController {

    private final UserProfileDao userProfileDao;

    @Autowired
    public UserProfileController(UserProfileDao userProfileDao) {
        this.userProfileDao = userProfileDao;
    }

    @GetMapping("/user-profiles/public")
    public ResponseEntity<?> publicEndpoint() {
        return ResponseEntity.ok("This is a public endpoint accessible by anyone.");
    }

    @GetMapping("/user-profiles/my-profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getMyProfile(Principal principal) {
        UserProfile userProfile = userProfileDao.getUserProfileByEmail(principal.getName());
        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user-profiles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserProfile>> getAllUserProfiles() {
        List<UserProfile> profiles = userProfileDao.getAllUserProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/user-profiles/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or principal.id == #userId")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable int userId) {
        UserProfile profile = userProfileDao.getUserProfileByUserId(userId);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/user-profiles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createUserProfile(@RequestBody UserProfile userProfile) {
        userProfileDao.addUserProfile(userProfile);
        return ResponseEntity.ok("User profile created successfully.");
    }

    @PutMapping("/user-profiles/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or principal.id == #userId")
    public ResponseEntity<?> updateUserProfile(@PathVariable int userId, @RequestBody UserProfile userProfile) {
        UserProfile existingProfile = userProfileDao.getUserProfileByUserId(userId);
        if (existingProfile != null) {
            userProfileDao.updateUserProfile(userId, userProfile);
            return ResponseEntity.ok("User profile updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/user-profiles/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUserProfile(@PathVariable int userId) {
        UserProfile existingProfile = userProfileDao.getUserProfileByUserId(userId);
        if (existingProfile != null) {
            userProfileDao.deleteUserProfile(userId);
            return ResponseEntity.ok("User profile deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
