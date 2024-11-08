package com.hack.demo.data;

import com.hack.demo.dtos.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private JdbcClient jdbcClient;

    private final String bookingInsertQuery = "INSERT INTO booking (first_name, last_name, email, phone, " +
            "departure_city, departure_address, arrival_city, arrival_address, " +
            "arrival_time, seat_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


    public void insertBooking(BookingDTO bookingDTO) {
        jdbcClient.sql(bookingInsertQuery)
                .param(bookingDTO.getUser().getFirstName())
                .param(bookingDTO.getUser().getLastName())
                .param(bookingDTO.getUser().getEmail())
                .param(bookingDTO.getUser().getPhone())
                .param(bookingDTO.getDeparture().getCity())
                .param(bookingDTO.getDeparture().getAddress())
                .param(bookingDTO.getArrival().getCity())
                .param(bookingDTO.getArrival().getAddress())
                .param(bookingDTO.getArrivalTime())
                .param(bookingDTO.getSeatType())
                .update();
    }
}
