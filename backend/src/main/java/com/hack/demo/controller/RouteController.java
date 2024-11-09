package com.hack.demo.controller;

import com.hack.demo.data.SingleRoute;
import com.hack.demo.route.SimpleRouteCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/route")
public class RouteController {


    @Autowired
    SimpleRouteCalculatorService osmRouting;

    @GetMapping("/calculate")
    public ResponseEntity<SingleRoute> calculate(@RequestParam String partenza, @RequestParam String arrivo) {
        Optional<SingleRoute> calculatedDistance = osmRouting.calculate(partenza, arrivo);
        return ResponseEntity.of(calculatedDistance);
    }
}
