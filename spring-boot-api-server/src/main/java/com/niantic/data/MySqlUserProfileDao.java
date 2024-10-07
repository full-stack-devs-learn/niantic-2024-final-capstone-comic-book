package com.niantic.data;

import com.niantic.models.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlUserProfileDao implements UserProfileDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlUserProfileDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<UserProfile> getAllUserProfiles() {
        List<UserProfile> profiles = new ArrayList<>();
        String sql = "SELECT * FROM user_profile";

        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql);
        while (rowSet.next()) {
            profiles.add(mapRow(rowSet));
        }
        return profiles;
    }

    @Override
    public int getUserId() {
        String sql = "SELECT user_id FROM user_profile LIMIT 1";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public String getUserEmail() {
        String sql = "SELECT email FROM user_profile LIMIT 1";
        return jdbcTemplate.queryForObject(sql, String.class);
    }

    @Override
    public String getFirstName() {
        String sql = "SELECT first_name FROM user_profile LIMIT 1";
        return jdbcTemplate.queryForObject(sql, String.class);
    }

    @Override
    public String getLastName() {
        String sql = "SELECT last_name FROM user_profile LIMIT 1";
        return jdbcTemplate.queryForObject(sql, String.class);
    }

    @Override
    public String getAddress() {
        String sql = "SELECT address " + "FROM user_profile LIMIT 1";
        return jdbcTemplate.queryForObject(sql, String.class);
    }

    @Override
    public void addUserProfile(UserProfile userProfile) {
        String sql = "INSERT INTO user_profile (user_id, email, first_name, last_name, address) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, userProfile.getUserId(), userProfile.getEmail(),
                userProfile.getFirstName(), userProfile.getLastName(), userProfile.getAddress());
    }

    @Override
    public void updateUserProfile(int userId) {
        String sql = "UPDATE user_profile SET email = ?, first_name = ?, last_name = ?, address = ? WHERE user_id = ?";
        jdbcTemplate.update(sql, userId);
    }

    @Override
    public void deleteUserProfile(int userId) {
        String sql = "DELETE FROM user_profile WHERE user_id = ?";
        jdbcTemplate.update(sql, userId);
    }

    private UserProfile mapRow(SqlRowSet rowSet) {
        int userId = rowSet.getInt("user_id");
        String email = rowSet.getString("email");
        String firstName = rowSet.getString("first_name");
        String lastName = rowSet.getString("last_name");
        String address = rowSet.getString("address");

        return new UserProfile(userId, email, firstName, lastName, address);
    }
}