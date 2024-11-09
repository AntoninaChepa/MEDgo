package com.hack.demo.domain;

import java.time.LocalDate;
import java.time.LocalTime;

public class Booking {

    private long id;
    private String nome;
    private String cognome;
    private String telefono;
    private String localitaPartenza;
    private String coordinatePartenza;
    private String localitaArrivo;
    private String posizioneArrivo;
    private LocalDate dataVisita;
    private LocalTime oraVisita;
    private String tipoPosto;
    private String statoPaziente;
    private Long isUrgente;


    public Booking() {
    }

    public Booking(long id, String nome, String cognome, String telefono, String localitaPartenza, String coordinatePartenza, String localitaArrivo, String posizioneArrivo, LocalDate dataVisita, LocalTime oraVisita, String tipoPosto, String statoPaziente, Long isUrgente) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.localitaPartenza = localitaPartenza;
        this.coordinatePartenza = coordinatePartenza;
        this.localitaArrivo = localitaArrivo;
        this.posizioneArrivo = posizioneArrivo;
        this.dataVisita = dataVisita;
        this.oraVisita = oraVisita;
        this.tipoPosto = tipoPosto;
        this.statoPaziente = statoPaziente;
        this.isUrgente = isUrgente;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getLocalitaPartenza() {
        return localitaPartenza;
    }

    public void setLocalitaPartenza(String localitaPartenza) {
        this.localitaPartenza = localitaPartenza;
    }

    public String getCoordinatePartenza() {
        return coordinatePartenza;
    }

    public void setCoordinatePartenza(String coordinatePartenza) {
        this.coordinatePartenza = coordinatePartenza;
    }

    public String getLocalitaArrivo() {
        return localitaArrivo;
    }

    public void setLocalitaArrivo(String localitaArrivo) {
        this.localitaArrivo = localitaArrivo;
    }

    public String getPosizioneArrivo() {
        return posizioneArrivo;
    }

    public void setPosizioneArrivo(String posizioneArrivo) {
        this.posizioneArrivo = posizioneArrivo;
    }

    public LocalDate getDataVisita() {
        return dataVisita;
    }

    public void setDataVisita(LocalDate dataVisita) {
        this.dataVisita = dataVisita;
    }

    public LocalTime getOraVisita() {
        return oraVisita;
    }

    public void setOraVisita(LocalTime oraVisita) {
        this.oraVisita = oraVisita;
    }

    public String getTipoPosto() {
        return tipoPosto;
    }

    public void setTipoPosto(String tipoPosto) {
        this.tipoPosto = tipoPosto;
    }

    public String getStatoPaziente() {
        return statoPaziente;
    }

    public void setStatoPaziente(String statoPaziente) {
        this.statoPaziente = statoPaziente;
    }

    public Long getIsUrgente() {
        return isUrgente;
    }

    public void setIsUrgente(Long isUrgente) {
        this.isUrgente = isUrgente;
    }


}