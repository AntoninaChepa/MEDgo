package com.hack.demo.data;

import com.hack.demo.domain.Booking;
import com.hack.demo.dtos.BookingDTO;
import com.hack.demo.route.SimpleRouteCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    SimpleRouteCalculatorService osmRouting;

    private final String bookingInsertQuery = "INSERT INTO booking (first_name, last_name, email, phone, " +
            "departure_city, departure_address, arrival_city, arrival_address, " +
            "arrival_time, seat_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


    public void insertBooking(BookingDTO bookingDTO) {


        Booking booking = getFrom(bookingDTO);
        bookingDao.insertBooking(booking);
    }

    private Booking getFrom(BookingDTO bookingDTO) {
        Optional<SingleRoute> calculate = osmRouting.calculate(bookingDTO.getDeparture(), bookingDTO.getArrival());
        return new Booking(0L,
                bookingDTO.getFirstName(),
                bookingDTO.getLastName(),
                bookingDTO.getPhone(),
                bookingDTO.getDeparture(),
                concatenatePosizioneAndata(calculate),
                bookingDTO.getArrival(),
                concatenatePosizioneRitorno(calculate),
                bookingDTO.getArrivalTime().toLocalDate(),
                bookingDTO.getArrivalTime().toLocalTime(),
                bookingDTO.getSeatType(),
                StatoPaziente.IN_ATTESA_DI_PASSAGGIO.toString(),
                0L
        );
    }

    private String concatenatePosizioneAndata(Optional<SingleRoute> calculate) {
        return calculate.get().coordinateLAT_andata + ";" + calculate.get().coordinateLNG_andata;
    }

    private String concatenatePosizioneRitorno(Optional<SingleRoute> calculate) {
        return calculate.get().coordinateLAT_ritorno + ";" + calculate.get().coordinateLNG_ritorno;
    }


}
