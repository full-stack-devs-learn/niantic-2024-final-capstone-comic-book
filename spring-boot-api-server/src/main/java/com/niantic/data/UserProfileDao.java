package com.niantic.data;

import com.niantic.models.UserProfile;

import java.util.List;

public interface UserProfileDao {

    List<UserProfile> getAllUserProfiles();

    int getUserId();

    String getUserEmail();

    String getFirstName();

    String getLastName();

    String getAddress();

    void addUserProfile(UserProfile userProfile);

    void updateUserProfile(int profileId);

    void deleteUserProfile(int profileId);
}