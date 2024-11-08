package com.hack.demo;

import com.hack.demo.integration.CsvParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    @Autowired
    CsvParserService csvParserService;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
