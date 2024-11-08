package com.hack.demo;

import ch.qos.logback.core.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/hospitals")
public class HospitalController {

    @Autowired
    Dao dao;
    /*
    @GetMapping
    public ResponseEntity<List<Hospital>> getHospitals() {
        return ResponseEntity.o
    }*/
}
