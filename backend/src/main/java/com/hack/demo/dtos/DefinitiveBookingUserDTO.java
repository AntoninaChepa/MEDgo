package com.hack.demo.dtos;

import java.time.LocalDateTime;

public class DefinitiveBookingUserDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String departure;
    private String arrival;
    private LocalDateTime arrivalTime;
    private String seatType;
    private int isUrgent;

    public DefinitiveBookingUserDTO() {
    }

    public DefinitiveBookingUserDTO(String firstName, String lastName, String email, String phone, String departure, String arrival, LocalDateTime arrivalTime, String seatType, int isUrgent) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.departure = departure;
        this.arrival = arrival;
        this.arrivalTime = arrivalTime;
        this.seatType = seatType;
        this.isUrgent = isUrgent;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public int getIsUrgent() {
        return isUrgent;
    }

    public void setIsUrgent(int isUrgent) {
        this.isUrgent = isUrgent;
    }
}
