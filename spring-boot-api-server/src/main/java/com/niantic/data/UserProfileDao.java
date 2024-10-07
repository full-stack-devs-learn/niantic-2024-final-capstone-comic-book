package com.niantic.data;

import com.niantic.models.UserProfile;

import java.util.List;

public interface UserProfileDao {

    List<UserProfile> getAllUserProfiles();

    UserProfile getUserProfileByUserId(int userId);

    UserProfile getUserProfileByEmail(String email);

    void addUserProfile(UserProfile userProfile);

    void updateUserProfile(int userId, UserProfile userProfile);

    void deleteUserProfile(int userId);
}