package com.hack.demo.data;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

@Data
@RequiredArgsConstructor
public class SingleRoute {
    BigDecimal distanza;
    BigDecimal durata;

    public SingleRoute(BigDecimal distanza, BigDecimal durata) {
        this.distanza = distanza;
        this.durata = durata;
    }
}
