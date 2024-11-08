package com.hack.demo.controller;

import com.hack.demo.data.UsersDao;
import com.hack.demo.security.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping
@AllArgsConstructor
public class UserController {

    @Autowired
    UsersDao usersDao;

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam(name = "email") String email){

        Optional<User> user = usersDao.findByEmail(email);
        return ResponseEntity.of(user);
    }
}
