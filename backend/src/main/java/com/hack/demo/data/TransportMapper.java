package com.hack.demo.data;


import com.hack.demo.domain.Transport;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;

public class TransportMapper implements RowMapper<Transport> {
    public static final String SELECT_ALL = "SELECT * FROM transport";
    public static final String SELECT_BY_TRANSPORT_NUMMER = "SELECT * FROM transport WHERE transport_nummer = ?";

    @Override
    public Transport mapRow(ResultSet rs, int rowNum) throws SQLException {
        Transport transport = new Transport();
        transport.setTransportnummer(rs.getString("transport_nummer"));
        transport.setTransportdatum(rs.getObject("transport_datum", LocalDate.class));
        transport.setTranhstart(rs.getObject("tranh_start", LocalTime.class));
        transport.setTranhende(rs.getObject("tranh_ende", LocalTime.class));
        transport.setTranvonort(rs.getString("tran_von_ort"));
        transport.setTranvonstrasse(rs.getString("tran_von_strasse"));
        transport.setTranbisort(rs.getString("tran_bis_ort"));
        transport.setTranbisstrasse(rs.getString("tran_bis_strasse"));
        transport.setTransportart(rs.getString("transport_art"));
        transport.setBezugnr(rs.getString("bezug_nr"));
        transport.setKmtotale(rs.getInt("km_totale"));
        transport.setFuhrparkklasse(rs.getString("fuhrpark_klasse"));
        transport.setSektionort(rs.getString("sektion_ort"));
        return transport;
    }
}