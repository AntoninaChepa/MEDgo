package com.hack.demo.route;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import static java.util.Optional.empty;

@Service
public class GeomappingGoogleService {

    public Optional<GeocodingResponse> calcola(String indirizzo) {
        try {
            // Sostituisci con la tua API Key di Google Maps
            String apiKey = "AIzaSyBHx6RngYIwzjEaWQVWIdvxWA38Ob4_33g";

            // Costruisci l'URL per la richiesta
            String urlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                    indirizzo.replace(" ", "+") + "&key=" + apiKey;

            // Crea una connessione HTTP
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            // Leggi la risposta
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Usa Jackson per deserializzare la risposta JSON in un oggetto Java
            ObjectMapper objectMapper = new ObjectMapper();
            GeocodingResponse geocodingResponse = objectMapper.readValue(response.toString(), GeocodingResponse.class);

            // Verifica se la risposta è OK
            if ("OK".equals(geocodingResponse.getStatus())) {
                // Estrai la latitudine e longitudine del primo risultato
                GeocodingResponse.Result result = geocodingResponse.getResults().get(0);
                double lat = result.getGeometry().getLocation().getLat();
                double lng = result.getGeometry().getLocation().getLng();

                System.out.println("Formatted Address: " + result.getFormatted_address());
                System.out.println("Latitude: " + lat);
                System.out.println("Longitude: " + lng);
                return Optional.of(geocodingResponse);
            } else {
                System.out.println("Nessun risultato trovato per l'indirizzo.");
                return empty();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return empty();
    }
}


