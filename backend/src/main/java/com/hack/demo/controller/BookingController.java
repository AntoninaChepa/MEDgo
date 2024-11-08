package com.hack.demo.controller;

import com.hack.demo.data.BookingService;
import com.hack.demo.dtos.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody BookingDTO bookingDTO) {
        bookingService.insertBooking(bookingDTO);
        return ResponseEntity.ok("Request submitted successfully");
    }
}