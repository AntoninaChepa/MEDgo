package com.hack.demo.controller;

import com.hack.demo.data.BookingDao;
import com.hack.demo.data.BookingService;
import com.hack.demo.domain.Booking;
import com.hack.demo.dtos.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;
    @Autowired
    BookingDao bookingDao;

    @PostMapping
    public ResponseEntity<?> submitRequest(@RequestBody BookingDTO bookingDTO) {
        bookingService.insertBooking(bookingDTO);
        return ResponseEntity.ok("Request submitted successfully");
    }

    @GetMapping("/get-by-date")
    public List<Booking> getByDate(@RequestParam LocalDate date) {
        return bookingDao.getBookingsByDate(date);
    }

}