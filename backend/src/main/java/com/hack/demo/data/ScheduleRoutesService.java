package com.hack.demo.data;

import com.hack.demo.domain.Booking;
import com.hack.demo.domain.Veicolo;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ScheduleRoutesService {


    private static final String API_KEY = "5b3ce3597851110001cf624806a66f799f5c47a1b166a5a65c8c1a3d";  // Sostituisci con la tua chiave API
    private static final String ORS_API_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

    @Autowired
    BookingDao bookingDao;
    // alle 17 aggiorna la tabella scheduled-routes
    // da preparare la schedulazione

    public void schedule() {
        //legge i booking da db
        List<Booking> bookings = bookingDao.getBookingsByDate(LocalDate.of(2024, 10, 11));


        //raggruppa i booking per destinazione e orario
        Map<Integer, List<Booking>> oraELista = raggruppaPerOraVisita(bookings);

        //chiama OpenRouteService per schedulare gli itinerari


        //inserisce gli itinerari in scheduled_routes - va salvata la corrispondenza booking-scheduled_routes


        //tabella ritiro_paziente

    }

    public Map<Integer, List<Booking>> raggruppaPerOraVisita(List<Booking> bookings) {
        return bookings.stream()  // Crea uno stream dalla lista di bookings
                .collect(Collectors.groupingBy(booking -> booking.getOraVisita().getHour()));  // Raggruppa per oraVisita
    }


    public static void planJourney(List<Booking> booking, List<String> vehicleCoordinates) throws Exception {
        // Impostazioni dei veicoli disponibili
        List<Veicolo> vehicles = new ArrayList<>();
        vehicles.add(new Veicolo("bus1", 5, 1, 1, 1, 1, "FTW")); // Veicolo con capacità specifica
        vehicles.add(new Veicolo("bus2", 7, 2, 2, 1, 2, "FTW"));  // Un altro veicolo

        // Calcola la matrice delle distanze (tempi di viaggio) tra tutte le posizioni di ritiro e la destinazione
        List<String> locations = new ArrayList<>(vehicleCoordinates);  // Includiamo i veicoli come punti di partenza
        for (Booking b : booking) {
            locations.add(b.getCoordinatePartenza());
        }

        /*
        JSONArray distanceMatrix = calculateDistanceMatrix(locations);

        // Assegna i passeggeri ai veicoli in base alla capacità
        for (Map<String, Object> passenger : passengerRequests) {
            String seatType = (String) passenger.get("seatType");
            int requiredSeats = (int) passenger.get("quantity");

            // Cerca un veicolo che abbia abbastanza posti disponibili
            boolean assigned = false;
            for (Veicolo vehicle : vehicles) {
                if (vehicle.hasCapacity(seatType, requiredSeats)) {
                    System.out.println("Assegnato " + requiredSeats + " " + seatType + " a " + vehicle.type);
                    vehicle.addPassengers(seatType, requiredSeats);
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                System.out.println("Non ci sono veicoli con abbastanza posti per " + requiredSeats + " " + seatType);
            }
            for (Veicolo v : vehicles) {
                String vehicleStart = vehicleCoordinates.get(vehicles.indexOf(v)); // Punto di partenza del veicolo
                List<String> passengerCoordinates = new ArrayList<>();
                for (Map<String, Object> passenger : passengerRequests) {
                    passengerCoordinates.add((String) passenger.get("pickup"));
                }
                passengerCoordinates.add(vehicleStart); // Aggiungi la posizione del veicolo alla lista dei punti da visitare
                String route = calculateOptimizedRoute(vehicleStart, passengerCoordinates);
                System.out.println("Percorso ottimizzato per " + vehicle.type + ": " + route);
            }
        }

         */

    }
}
