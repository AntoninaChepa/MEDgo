package com.hack.demo;

import com.hack.demo.data.VehicleStatsDao;
import com.hack.demo.domain.VehicleStats;
import com.hack.demo.integration.CsvParserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class StartupConfig {

    private final CsvParserService csvParserService;

    private final VehicleStatsDao vehicleStatsDao;

    public StartupConfig(CsvParserService csvParserService, VehicleStatsDao vehicleStatsDao) {
        this.csvParserService = csvParserService;
        this.vehicleStatsDao = vehicleStatsDao;
    }

    @Bean
    CommandLineRunner loadDataOnStartup() {
        return args -> {
            vehicleStatsDao.deleteAll();
            List<VehicleStats> vehicleStatsList = csvParserService.loadVehicleStatsFromCsv();
            vehicleStatsList.forEach(System.out::println); // Print each record for demonstration
            vehicleStatsDao.batchInsertVehicleStats(vehicleStatsList);
        };
    }
}
