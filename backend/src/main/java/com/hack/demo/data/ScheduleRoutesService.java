package com.hack.demo.data;

import com.hack.demo.domain.Booking;
import com.hack.demo.domain.MatrixRequest;
import com.hack.demo.domain.MatrixResponse;
import com.hack.demo.domain.Veicolo;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ScheduleRoutesService {

    RestClient restClient;

    ScheduledRoutesDao scheduledRoutesDao;

    private static final String ORS_API_URL = "https://api.openrouteservice.org/v2/";
    private static final String API_KEY = "5b3ce3597851110001cf624806a66f799f5c47a1b166a5a65c8c1a3d";  // Sostituisci con la tua chiave API
    private static final String DIRECTIONS_API_URI = "directions/driving-car";
    private static final String MATRIX_API_URI = "matrix/?";

    public ScheduleRoutesService(){
        this.restClient = RestClient.builder()
                .baseUrl(ORS_API_URL)
                .defaultHeader("Authorization", "Bearer " +
                        API_KEY
                )
                .build();
    }

    @Autowired
    BookingDao bookingDao;
    // alle 17 aggiorna la tabella scheduled-routes
    // da preparare la schedulazione


    @Scheduled(cron = "0 0 17 * * *")
    public void schedule() {
        LocalDate targetDate = LocalDate.now();  // Change to desired date if needed
        List<Booking> bookings = bookingDao.getBookingsByDate(targetDate);
        Map<Integer, List<Booking>> oraELista = raggruppaPerOraVisita(bookings);

        MatrixRequest matrixRequest = buildMatrixRequest(oraELista);

        MatrixResponse matrixResponse = restClient.post()
                .uri(MATRIX_API_URI)
                .body(matrixRequest)
                .retrieve()
                .body(MatrixResponse.class);

        saveScheduledRoutes(matrixResponse, oraELista,);
    }

    public Map<Integer, List<Booking>> raggruppaPerOraVisita(List<Booking> bookings) {
        return bookings.stream()  // Crea uno stream dalla lista di bookings
                .collect(Collectors.groupingBy(booking -> booking.getOraVisita().getHour()));  // Raggruppa per oraVisita
    }

    private MatrixRequest buildMatrixRequest(Map<Integer, List<Booking>> oraELista) {
        // Convert booking locations into coordinates for ORS matrix request
        List<MatrixRequest.Coordinate> locations = oraELista.values().stream()
                .flatMap(List::stream)
                .map(booking -> new MatrixRequest.Coordinate(Double.parseDouble(booking.getCoordinatePartenza().split(",")[0]), Double.parseDouble(booking.getCoordinatePartenza().split(",")[1])))
                .collect(Collectors.toList());

        // Create and return MatrixRequest object
        MatrixRequest matrixRequest = new MatrixRequest();
        matrixRequest.setLocations(locations);
        matrixRequest.setMetrics(List.of("duration"));
        matrixRequest.setSources(List.of("all"));
        matrixRequest.setDestinations(List.of("all"));
        matrixRequest.setUnits("m");
        matrixRequest.setResolveLocations(false);
        matrixRequest.setId("my_request");

        return matrixRequest;
    }


    private void saveScheduledRoutes(MatrixResponse response, Map<Integer, List<Booking>> oraELista, List<Veicolo> availableVehicles) throws SQLException {
        // Process the matrix response, iterate over bookings grouped by hour
        int i = 0;
        for (List<Booking> bookingsAtHour : oraELista.values()) {
            // Create a map to sum passengers for each seat type based on the matrix response
            Map<String, Integer> seatTypePassengerCount = new HashMap<>();

            // Sum passengers for each seat type in this time slot, based on the travel matrix
            for (Booking booking : bookingsAtHour) {
                String seatType = booking.getTipoPosto();

                // Assuming that 'booking' has a field `destinationId` to match the matrix indices
                String destinationIndex = booking.getPosizioneArrivo();


                // Matrix index for this booking's destination
                int duration = response.getDurations()[i][destinationIndex];  // Get the travel time from the matrix

                // Check if the passenger needs to be on the road
                if (duration > 0) {  // If duration is positive, that means the passenger is traveling
                    int numPassengers = booking.
                    seatTypePassengerCount.put(seatType, seatTypePassengerCount.getOrDefault(seatType, 0) + numPassengers);
                }
            }

            // For each seat type, find a suitable vehicle
            for (Map.Entry<String, Integer> entry : seatTypePassengerCount.entrySet()) {
                String seatType = entry.getKey();
                int totalPassengers = entry.getValue();

                // Find an available vehicle with enough capacity for the seat type
                Veicolo selectedVehicle = findAvailableVehicle(availableVehicles, seatType, totalPassengers);

                if (selectedVehicle != null) {
                    // Reserve the seats in the selected vehicle
                    selectedVehicle.addPassengers(seatType, totalPassengers);

                    // Process each booking for this seat type and create a ScheduledRoute entry
                    for (Booking booking : bookingsAtHour) {
                        if (booking.getTipoPosto().equals(seatType)) {
                            // Get the duration (travel time) from the matrix response
                            int duration = response.getDurations()[i][booking.getDestinationIndex()];  // Using the correct destination index

                            // Calculate the pickup time by subtracting duration from the target arrival time
                            LocalTime oraVisita = booking.getOraVisita();
                            LocalTime orarioRitiro = oraVisita.minusMinutes(duration);

                            // Insert the new ScheduledRoute entry
                            ScheduledRoute scheduledRoute = ScheduledRoute.builder()
                                    .bookingId(booking.getId())
                                    .orarioRitiro(orarioRitiro)
                                    .veicolo(selectedVehicle.getTarga())  // Use the vehicle's registration number as the vehicle ID
                                    .avvenutaNotifica(false)
                                    .build();

                            scheduledRoutesDao.insert(scheduledRoute);
                        }
                    }
                } else {
                    // Handle case where no vehicle is available (this might be an error or warning)
                    System.out.println("No vehicle available for seat type " + seatType + " at booking time " + bookingsAtHour.get(0).getOraVisita());
                }
            }

            i++;
        }
    }



    private Veicolo findAvailableVehicle(List<Veicolo> availableVehicles, String seatType, int numPassengers) {
        // Find the first vehicle that has enough capacity for the given seat type and number of passengers
        for (Veicolo veicolo : availableVehicles) {
            if (veicolo.hasCapacity(seatType, numPassengers)) {
                return veicolo;  // Return the first vehicle with enough capacity
            }
        }
        return null;  // No available vehicle found
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
