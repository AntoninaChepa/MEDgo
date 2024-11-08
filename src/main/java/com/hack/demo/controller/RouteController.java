package com.hack.demo.controller;

import com.hack.demo.data.SingleRoute;
import com.hack.demo.data.UsersDao;
import com.hack.demo.domain.Hospital;
import com.hack.demo.routing.OSMRouting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/route/calculate")
public class RouteController {


    @Autowired
    OSMRouting osmRouting;

    @GetMapping
    public ResponseEntity<SingleRoute> getHospitals(@RequestParam String partenza, @RequestParam String arrivo) {
        Optional<SingleRoute> calculatedDistance = osmRouting.calculate(partenza, arrivo);
        return ResponseEntity.of(calculatedDistance);
    }
}
