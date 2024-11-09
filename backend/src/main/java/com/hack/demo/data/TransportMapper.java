package com.hack.demo.data;


import com.hack.demo.domain.Transport;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;


public class TransportMapper implements RowMapper<Transport> {
    public static final String SELECT_ALL = "SELECT * FROM transport";
    public static final String SELECT_BY_TRANSPORT_NUMBER = "SELECT * FROM transport WHERE transport_number = ?";
    public static final String DELETE_ALL = "DELETE FROM transport";
    public static final String INSERT = """
        INSERT INTO transport (
            transport_number, transport_date, transport_start, transport_end, from_location, 
            from_street, to_location, to_street, transport_type, reference_number, 
            total_km, fleet_class, section_location
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """;

    @Override
    public Transport mapRow(ResultSet rs, int rowNum) throws SQLException {
        Transport transport = new Transport();

        // Mapping snake_case column names to camelCase entity fields
        transport.setTransportNumber(rs.getString("transport_number"));
        transport.setTransportDate(rs.getObject("transport_date", LocalDate.class));
        transport.setTransportStart(rs.getObject("transport_start", LocalTime.class));
        transport.setTransportEnd(rs.getObject("transport_end", LocalTime.class));
        transport.setFromLocation(rs.getString("from_location"));
        transport.setFromStreet(rs.getString("from_street"));
        transport.setToLocation(rs.getString("to_location"));
        transport.setToStreet(rs.getString("to_street"));
        transport.setTransportType(rs.getString("transport_type"));
        transport.setReferenceNumber(rs.getString("reference_number"));
        transport.setTotalKm(rs.getInt("total_km"));
        transport.setFleetClass(rs.getString("fleet_class"));
        transport.setSectionLocation(rs.getString("section_location"));

        return transport;
    }
}
