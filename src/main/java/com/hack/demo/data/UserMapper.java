package com.hack.demo.data;

import com.hack.demo.security.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    public static final String SELECT = "SELECT * FROM user";
    public static final String SELECT_EMAIL = "SELECT * FROM user WHERE email = ?";

    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User entity = new User();
        entity.setId(rs.getInt("Id"));
        entity.setEmail(rs.getString("Descrizione"));
        return entity;
    }
}
