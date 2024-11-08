package com.hack.demo.dtos;


import com.hack.demo.domain.BookingUser;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDTO {

    private BookingUser user;
    private Location departure;
    private Location arrival;
    private LocalDateTime arrivalTime;
    private String seatType;

}