package com.hack.demo.route;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hack.demo.data.SingleRoute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import static java.math.BigDecimal.valueOf;
import static java.math.RoundingMode.HALF_UP;

@Service
public class SimpleRouteCalculatorService {

    @Autowired
    GeomappingGoogleService geomappingGoogleService;
    public Optional<SingleRoute> calculate(String startAddress, String endAddress) {
        try {
            // 1. Geocoding dell'indirizzo di partenza
            Optional<GeocodingResponse> startLocation = geomappingGoogleService.calcola(startAddress);
            double startLat = startLocation.get().getResults().get(0).getGeometry().getLocation().getLat();
            double startLon = startLocation.get().getResults().get(0).getGeometry().getLocation().getLng();
            System.out.println("Coordinate di partenza: " + startLat + ", " + startLon);

            // 2. Geocoding dell'indirizzo di arrivo
            Optional<GeocodingResponse> endLocation = geomappingGoogleService.calcola(endAddress);
            double endLat = endLocation.get().getResults().get(0).getGeometry().getLocation().getLat();
            double endLon = endLocation.get().getResults().get(0).getGeometry().getLocation().getLng();
            System.out.println("Coordinate di partenza: " + startLat + ", " + startLon);

            // 3. Calcolare il percorso tra i due punti
            JsonNode jsonResponse = calculateRoute(startLon, startLat, endLon, endLat);

            // Estrai le informazioni del percorso
            JsonNode route = jsonResponse.get("routes").get(0);
            double distance = route.get("legs").get(0).get("distance").asDouble();  // distanza in metri
            double duration = route.get("legs").get(0).get("duration").asDouble();  // durata in secondi

            System.out.println("Distanza: " + distance + " metri");
            System.out.println("Durata: " + duration + " secondi");


            return Optional.of(new SingleRoute(valueOf(distance).divide(valueOf(1000), HALF_UP),
                    valueOf(duration).divide(valueOf(60), HALF_UP),
                    startLon, startLon,
                    endLat, endLon
                    ));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    private static JsonNode calculateRoute(double startLon, double startLat, double endLon, double endLat) throws IOException {
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
        return jsonResponse;
    }


    //NOMINATIM è impreciso, ora usiamo google, in futuro DB si spera
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

        return jsonResponse.get(0);
    }
}
