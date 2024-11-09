package com.hack.demo.dtos;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String departure;
    private String arrival;
    private LocalDateTime arrivalTime;
    private String seatType;


}