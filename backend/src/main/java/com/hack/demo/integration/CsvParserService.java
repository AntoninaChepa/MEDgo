package com.hack.demo.integration;

import com.hack.demo.domain.Transport;
import com.hack.demo.domain.VehicleStats;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
@Service
public class CsvParserService {

    @Value("${types_csv.file.path}")
    private String csvFilePath;

    @Value("${transport_csv.file.path}")
    private String transportCsvFilePath;

    // Load vehicle data from CSV (accessed as classpath resource)
    public List<VehicleStats> loadVehicleStatsFromCsv() {
        List<VehicleStats> vehicleStatsList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("vehicle.csv"))));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withDelimiter(';'))) {

            // Process the CSV data
            for (CSVRecord csvRecord : csvParser) {
                VehicleStats vehicleStats = new VehicleStats();
                vehicleStats.setFleetClass(csvRecord.get(0));
                vehicleStats.setRecliningSeats(Integer.parseInt(csvRecord.get(1)));
                vehicleStats.setSeat(Integer.parseInt(csvRecord.get(2)));
                vehicleStats.setStanding(Integer.parseInt(csvRecord.get(3)));
                vehicleStats.setStaff(Integer.parseInt(csvRecord.get(4)));
                vehicleStats.setMaxPassengers(Integer.parseInt(csvRecord.get(5)));

                vehicleStatsList.add(vehicleStats);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Error parsing vehicle data: " + e.getMessage());
        }

        return vehicleStatsList;
    }

    // Load transport data from CSV (accessed via file path or classpath resource)
    public List<Transport> loadTransportData() {
        List<Transport> transportList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(Objects.requireNonNull(getClass().getClassLoader().getResourceAsStream("transports.csv"))));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withDelimiter(';'))) {

            // Process the CSV data
            for (CSVRecord csvRecord : csvParser) {
                Transport transport = new Transport();

                // Access columns by index
                transport.setTransportNumber(csvRecord.get(0));
                transport.setTransportDate(LocalDate.parse(csvRecord.get(1), formatter));
                transport.setTransportStart(LocalTime.parse(csvRecord.get(2)));
                transport.setTransportEnd(LocalTime.parse(csvRecord.get(3)));
                transport.setFromLocation(csvRecord.get(4));
                transport.setFromStreet(csvRecord.get(5));
                transport.setToLocation(csvRecord.get(6));
                transport.setToStreet(csvRecord.get(7));
                transport.setTransportType(csvRecord.get(8));
                transport.setReferenceNumber(csvRecord.get(9));
                transport.setTotalKm(Integer.parseInt(csvRecord.get(10)));
                transport.setFleetClass(csvRecord.get(11));
                transport.setSectionLocation(csvRecord.get(12));

                // Add to list
                transportList.add(transport);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            System.err.println("Error parsing transport data: " + e.getMessage());
        }

        return transportList;
    }
}