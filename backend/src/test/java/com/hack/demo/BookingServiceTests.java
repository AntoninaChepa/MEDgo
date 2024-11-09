package com.hack.demo;


import com.hack.demo.data.BookingDao;
import com.hack.demo.data.BookingService;
import com.hack.demo.data.SingleRoute;
import com.hack.demo.domain.Booking;
import com.hack.demo.dtos.BookingDTO;
import com.hack.demo.route.SimpleRouteCalculatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTests {

    @Mock
    private BookingDao bookingDao;

    @Mock
    private SimpleRouteCalculatorService osmRouting;

    @InjectMocks
    private BookingService bookingService;

    private BookingDTO bookingDTO;
    private SingleRoute singleRoute;

    @BeforeEach
    void setup() {
        // Setting up a sample BookingDTO
        bookingDTO = new BookingDTO();
        bookingDTO.setFirstName("John");
        bookingDTO.setLastName("Doe");
        bookingDTO.setEmail("john.doe@example.com");
        bookingDTO.setPhone("1234567890");
        bookingDTO.setDeparture("CityA");
        bookingDTO.setArrival("CityB");
        bookingDTO.setArrivalTime(LocalDateTime.of(2023, 11, 15, 10, 30));
        bookingDTO.setSeatType("Economy");

        // Setting up a sample SingleRoute returned by the mocked SimpleRouteCalculatorService
        singleRoute = new SingleRoute(
                new BigDecimal("120.50"),
                new BigDecimal("90.0"),
                45.123456,
                -93.123456,
                45.654321,
                -93.654321
        );
    }

    @Test
    void insertBooking_ShouldInsertBookingWithCorrectValues() {
        // Arrange
        when(osmRouting.calculate(bookingDTO.getDeparture(), bookingDTO.getArrival()))
                .thenReturn(Optional.of(singleRoute));

        ArgumentCaptor<Booking> bookingCaptor = ArgumentCaptor.forClass(Booking.class);

        // Act
        bookingService.insertBooking(bookingDTO);

        // Assert
        verify(bookingDao, times(1)).insertBooking(bookingCaptor.capture());
        Booking capturedBooking = bookingCaptor.getValue();

        assertNotNull(capturedBooking);
        assertEquals("John", capturedBooking.getNome());
        assertEquals("Doe", capturedBooking.getCognome());
        assertEquals("1234567890", capturedBooking.getTelefono());
        assertEquals("CityA", capturedBooking.getLocalitaPartenza());
        assertEquals("45.123456;-93.123456", capturedBooking.getCoordinatePartenza());
        assertEquals("CityB", capturedBooking.getLocalitaArrivo());
        assertEquals("45.654321;-93.654321", capturedBooking.getPosizioneArrivo());
        assertEquals(bookingDTO.getArrivalTime().toLocalDate(), capturedBooking.getDataVisita());
        assertEquals(bookingDTO.getArrivalTime().toLocalTime(), capturedBooking.getOraVisita());
        assertEquals("Economy", capturedBooking.getTipoPosto());
        assertEquals("IN_ATTESA_DI_PASSAGGIO", capturedBooking.getStatoPaziente());
        assertEquals(0L, capturedBooking.getIsUrgente());
    }

    @Test
    void insertBooking_ShouldThrowException_WhenRouteNotFound() {
        // Arrange
        when(osmRouting.calculate(bookingDTO.getDeparture(), bookingDTO.getArrival()))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NoSuchElementException.class, () -> bookingService.insertBooking(bookingDTO));
        verify(bookingDao, never()).insertBooking(any());
    }

    @Test
    void insertBooking_ShouldHandleNullRouteFieldsGracefully() {
        // Arrange
        SingleRoute incompleteRoute = new SingleRoute(new BigDecimal("120.50"), new BigDecimal("90.0"), 0, 0, 0, 0);
        when(osmRouting.calculate(bookingDTO.getDeparture(), bookingDTO.getArrival()))
                .thenReturn(Optional.of(incompleteRoute));

        ArgumentCaptor<Booking> bookingCaptor = ArgumentCaptor.forClass(Booking.class);

        // Act
        bookingService.insertBooking(bookingDTO);

        // Assert
        verify(bookingDao, times(1)).insertBooking(bookingCaptor.capture());
        Booking capturedBooking = bookingCaptor.getValue();

        assertEquals("0.0;0.0", capturedBooking.getCoordinatePartenza());
        assertEquals("0.0;0.0", capturedBooking.getPosizioneArrivo());
    }
}