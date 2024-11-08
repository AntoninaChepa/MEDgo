package com.hack.demo.integration;

import com.hack.demo.domain.VehicleStats;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvParserService {

    @Value("${types_csv.file.path}")
    private String csvFilePath;


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

    public List<VehicleStats> loadTransportData() {
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

}
