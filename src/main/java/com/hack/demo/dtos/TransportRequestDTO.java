package com.hack.demo.dtos;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransportRequestDTO {

    private String userName;
    private String userPhoneNumber;
    private String userEmail;
    private String originAddress;
    private String destinationHospital;
    private String hospitalAddress;
    private String hospitalName;
    private LocalDateTime requestedTime;
    private boolean requiresSpecialAccommodations;

}