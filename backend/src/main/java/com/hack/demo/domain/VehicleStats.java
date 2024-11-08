package com.hack.demo.domain;

import lombok.*;

@Data
public class VehicleStats {
    private String fleetClass;
    private int recliningSeats;
    private int seat;
    private int standing;
    private int staff;
    private int maxPassengers;
}
