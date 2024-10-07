package com.niantic.models;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Setter
@Getter

public class UserProfile {
    private int userId;
    private String email;
    private String firstName;
    private String lastName;
    private String address;

    public UserProfile() {
    }

    public UserProfile(int userId, String email, String firstName, String lastName, String address) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProfile that = (UserProfile) o;
        return
                userId == that.userId &&
                        Objects.equals(email, that.email) &&
                        Objects.equals(firstName, that.firstName) &&
                        Objects.equals(lastName, that.lastName) &&
                        Objects.equals(address, that.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, email, firstName, lastName, address);
    }


    @Override
    public String toString() {
        return STR."UserProfile{, userId=\{userId}, email='\{email}', firstName='\{firstName}', lastName='\{lastName}', address='\{address}'}";
    }

}