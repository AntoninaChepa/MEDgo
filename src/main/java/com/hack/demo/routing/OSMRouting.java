package com.hack.demo.routing;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hack.demo.data.SingleRoute;
import org.springframework.stereotype.Service;

import static java.math.BigDecimal.valueOf;

@Service
public class OSMRouting {

    // Funzione per geocodificare un indirizzo con Nominatim

    // Funzione per calcolare il percorso con OSRM
    public Optional<SingleRoute> calculate(String startAddress, String endAddress) {
        try {
            // 1. Geocoding dell'indirizzo di partenza
            JsonNode startLocation = geocode(startAddress);
            double startLat = startLocation.get("lat").asDouble();
            double startLon = startLocation.get("lon").asDouble();
            System.out.println("Coordinate di partenza: " + startLat + ", " + startLon);

            // 2. Geocoding dell'indirizzo di arrivo
            JsonNode endLocation = geocode(endAddress);
            double endLat = endLocation.get("lat").asDouble();
            double endLon = endLocation.get("lon").asDouble();
            System.out.println("Coordinate di arrivo: " + endLat + ", " + endLon);

            // 3. Calcolare il percorso tra i due punti
            String url = "http://router.project-osrm.org/route/v1/driving/" +
                    startLon + "," + startLat + ";" + endLon + "," + endLat + "?overview=false";

            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonResponse = mapper.readTree(response.toString());

            // Estrai le informazioni del percorso
            JsonNode route = jsonResponse.get("routes").get(0);
            double distance = route.get("legs").get(0).get("distance").asDouble();  // distanza in metri
            double duration = route.get("legs").get(0).get("duration").asDouble();  // durata in secondi

            System.out.println("Distanza: " + distance + " metri");
            System.out.println("Durata: " + duration + " secondi");


            return Optional.of(new SingleRoute(valueOf(distance).divide(valueOf(1000)),
                    valueOf(duration).divide(valueOf(60))));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public static JsonNode geocode(String address) throws Exception {
        String url = "https://nominatim.openstreetmap.org/search?q=" + address.replace(" ", "+") + "&format=json";
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonResponse = mapper.readTree(response.toString());

        return jsonResponse.get(0);  // Prendi il primo risultato
    }
}
