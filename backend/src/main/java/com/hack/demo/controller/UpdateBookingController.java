package com.hack.demo.controller;


import com.hack.demo.data.BookingDao;
import com.hack.demo.domain.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/update")
public class UpdateBookingController {

    @Autowired
    BookingDao bookingDao;

    @GetMapping("/show-notifications-to-make")
    public ResponseEntity<List<Booking>> calculate() {
        List<Booking> allBookings = bookingDao.getAllBookings();
        return allBookings.isEmpty() ?  ResponseEntity.notFound().build() : ResponseEntity.ok(allBookings);
    }

}
