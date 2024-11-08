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
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvParserService {

    @Value("${types_csv.file.path}")
    private String csvFilePath;

    @Value("${transport_csv.file.path}")
    private String transportCsvFilePath;

    public List<VehicleStats> loadVehicleStatsFromCsv() {
            List<VehicleStats> vehicleStatsList = new ArrayList<>();

            try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath));
                 CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withDelimiter(';'))) {

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
            }

            return vehicleStatsList;
    }

    public List<Transport> loadTransportData() {
        List<Transport> transportList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

        try (BufferedReader reader = new BufferedReader(new FileReader(transportCsvFilePath));
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withDelimiter(';'))) {

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