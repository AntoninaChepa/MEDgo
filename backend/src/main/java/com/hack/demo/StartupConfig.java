package com.hack.demo;

import com.hack.demo.data.TransportDao;
import com.hack.demo.data.VehicleStatsDao;
import com.hack.demo.domain.Transport;
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

    private final TransportDao transportDao;

    public StartupConfig(CsvParserService csvParserService, VehicleStatsDao vehicleStatsDao, TransportDao transportDao) {
        this.csvParserService = csvParserService;
        this.vehicleStatsDao = vehicleStatsDao;
        this.transportDao = transportDao;
    }

    @Bean
    CommandLineRunner loadDataOnStartup() {
        return args -> {
            vehicleStatsDao.deleteAll();
            vehicleStatsDao.batchInsertVehicleStats(csvParserService.loadVehicleStatsFromCsv());

            transportDao.deleteAll();
            transportDao.batchInsert(csvParserService.loadTransportData(),300);
        };
    }
}
