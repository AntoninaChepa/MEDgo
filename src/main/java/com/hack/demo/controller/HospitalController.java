package com.hack.demo.controller;

import com.hack.demo.data.UsersDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hospitals")
public class HospitalController {

    @Autowired
    UsersDao usersDao;
    /*
    @GetMapping
    public ResponseEntity<List<Hospital>> getHospitals() {
        return ResponseEntity.o
    }*/
}
