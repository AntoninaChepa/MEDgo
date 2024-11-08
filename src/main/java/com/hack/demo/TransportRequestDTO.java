package com.hack.demo;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
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