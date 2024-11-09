package com.hack.demo.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MatrixRequest {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    // Inner class to represent a coordinate pair
    public static class Coordinate {
        private double longitude;
        private double latitude;
    }

    private List<String> destinations;
    private String id;
    private List<Coordinate> locations;
    private List<String> metrics;
    private boolean resolveLocations;
    private List<String> sources;
    private String units;
}