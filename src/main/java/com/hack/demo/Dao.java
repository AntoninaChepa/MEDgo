package com.hack.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class Dao {

    @Autowired
    private JdbcClient jdbcClient;

    Optional<User> findByEmail(String email){
        String sql = Mapper.UserMapper.SELECT_EMAIL;
        return jdbcClient.sql(sql)
                .param(email)
                .query(new Mapper.UserMapper())
                .optional();
    }

}