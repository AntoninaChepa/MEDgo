package com.hack.demo.data;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SingleRoute {
    BigDecimal distanza;
    BigDecimal durata;
    double coordinateLNG_andata;
    double coordinateLAT_andata;
    double coordinateLNG_ritorno;
    double coordinateLAT_ritorno;

    public SingleRoute() {
    }

    public SingleRoute(BigDecimal distanza, BigDecimal durata, double coordinateLNG_andata, double coordinateLAT_andata, double coordinateLNG_ritorno, double coordinateLAT_ritorno) {
        this.distanza = distanza;
        this.durata = durata;
        this.coordinateLNG_andata = coordinateLNG_andata;
        this.coordinateLAT_andata = coordinateLAT_andata;
        this.coordinateLNG_ritorno = coordinateLNG_ritorno;
        this.coordinateLAT_ritorno = coordinateLAT_ritorno;
    }
}
