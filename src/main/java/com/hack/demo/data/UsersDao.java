package com.hack.demo.data;

import com.hack.demo.security.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UsersDao {

    @Autowired
    private JdbcClient jdbcClient;

    public Optional<User> findByEmail(String email){
        String sql = UserMapper.SELECT_EMAIL;
        return jdbcClient.sql(sql)
                .param(email)
                .query(new UserMapper())
                .optional();
    }

}