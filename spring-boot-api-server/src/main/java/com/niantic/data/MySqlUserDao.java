package com.niantic.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import com.niantic.models.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlUserDao implements UserDao
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlUserDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }


    @Override
    public User create(User newUser)
    {
        String sql = "INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)";
        String hashedPassword = new BCryptPasswordEncoder().encode(newUser.getPassword());

        // insert a new record and retrieve the generated id
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, newUser.getUsername());
            statement.setString(2, hashedPassword);
            statement.setString(3, newUser.getRole());

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return getUserById(newId);

    }

    @Override
    public List<User> getAll()
    {
        List<User> users = new ArrayList<>();

        String sql = "SELECT * FROM users";

        var row = jdbcTemplate.queryForRowSet(sql);

        while (row.next())
        {
            User user = mapRow(row);
            users.add(user);
        }

        return users;
    }

    @Override
    public User getUserById(int id)
    {
        String sql = "SELECT * FROM users WHERE user_id = ?";

        var row = jdbcTemplate.queryForRowSet(sql, id);

        if(row.next())
        {
            return mapRow(row);
        }

        return null;
    }

    @Override
    public User getByUserName(String username)
    {
        String sql = "SELECT * " +
                " FROM users " +
                " WHERE username = ?";

        var row = jdbcTemplate.queryForRowSet(sql, username);
        if(row.next())
        {
            return mapRow(row);
        }

        return null;
    }

    @Override
    public int getIdByUsername(String username)
    {
        User user = getByUserName(username);

        if(user != null)
        {
            return user.getId();
        }

        return -1;
    }

    @Override
    public boolean exists(String username)
    {
        User user = getByUserName(username);
        return user != null;
    }

    private User mapRow(SqlRowSet row)
    {
        int userId = row.getInt("user_id");
        String username = row.getString("username");
        String hashedPassword = row.getString("hashed_password");
        String role = row.getString("role");

        return new User(userId, username, hashedPassword, role);
    }
}
