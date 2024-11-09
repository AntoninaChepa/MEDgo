package com.hack.demo.domain;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class Transport {
    private String transportNumber;
    private LocalDate transportDate;
    private LocalTime transportStart;
    private LocalTime transportEnd;
    private String fromLocation;
    private String fromStreet;
    private String toLocation;
    private String toStreet;
    private String transportType;
    private String referenceNumber;
    private int totalKm;
    private String fleetClass;
    private String sectionLocation;
}