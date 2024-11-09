package com.hack.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MatrixResponse {

    // 2D array of distances between locations (in meters or kilometers, as specified)
    private int[][] distances;

    // 2D array of durations between locations (in seconds)
    private int[][] durations;

    // Metadata about source locations in the response
    private List<Integer> sources;

    // Metadata about destination locations in the response
    private List<Integer> destinations;
}