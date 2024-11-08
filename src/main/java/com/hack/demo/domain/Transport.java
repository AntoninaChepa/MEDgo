package com.hack.demo.domain;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class Transport {
    private String transportnummer;
    private LocalDate transportdatum;
    private LocalTime tranhstart;
    private LocalTime tranhende;
    private String tranvonort;
    private String tranvonstrasse;
    private String tranbisort;
    private String tranbisstrasse;
    private String transportart;
    private String bezugnr;
    private int kmtotale;
    private String fuhrparkklasse;
    private String sektionort;
}