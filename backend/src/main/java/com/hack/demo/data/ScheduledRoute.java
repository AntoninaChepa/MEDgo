package com.hack.demo.data;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data
@Builder
public class ScheduledRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "orario_ritiro")
    private LocalTime orarioRitiro;

    @Column(name = "veicolo")
    private String veicolo;

    @Column(name = "avvenuta_notifica", nullable = false)
    private Boolean avvenutaNotifica = false;
}