package com.hack.demo.domain;

public class Veicolo {

    private String targa;
    private int capienzaTotale;
    private int brande;
    private int postiReclinabili;
    private int postiNonReclinabili;
    private int staff;
    private String tipoVeicolo;


    public Veicolo() {
    }


    public Veicolo(String targa, int capienzaTotale, int brande, int postiReclinabili,
                   int postiNonReclinabili, int staff, String tipoVeicolo) {
        this.targa = targa;
        this.capienzaTotale = capienzaTotale;
        this.brande = brande;
        this.postiReclinabili = postiReclinabili;
        this.postiNonReclinabili = postiNonReclinabili;
        this.staff = staff;
        this.tipoVeicolo = tipoVeicolo;
    }


    public String getTarga() {
        return targa;
    }

    public void setTarga(String targa) {
        this.targa = targa;
    }

    public int getCapienzaTotale() {
        return capienzaTotale;
    }

    public void setCapienzaTotale(int capienzaTotale) {
        this.capienzaTotale = capienzaTotale;
    }

    public int getBrande() {
        return brande;
    }

    public void setBrande(int brande) {
        this.brande = brande;
    }

    public int getPostiReclinabili() {
        return postiReclinabili;
    }

    public void setPostiReclinabili(int postiReclinabili) {
        this.postiReclinabili = postiReclinabili;
    }

    public int getPostiNonReclinabili() {
        return postiNonReclinabili;
    }

    public void setPostiNonReclinabili(int postiNonReclinabili) {
        this.postiNonReclinabili = postiNonReclinabili;
    }

    public int getStaff() {
        return staff;
    }

    public void setStaff(int staff) {
        this.staff = staff;
    }

    public String getTipoVeicolo() {
        return tipoVeicolo;
    }

    public void setTipoVeicolo(String tipoVeicolo) {
        this.tipoVeicolo = tipoVeicolo;
    }


    @Override
    public String toString() {
        return "Veicolo{" +
                "targa='" + targa + '\'' +
                ", capienzaTotale=" + capienzaTotale +
                ", brande=" + brande +
                ", postiReclinabili=" + postiReclinabili +
                ", postiNonReclinabili=" + postiNonReclinabili +
                ", staff=" + staff +
                ", tipoVeicolo=" + tipoVeicolo +
                '}';
    }
}
