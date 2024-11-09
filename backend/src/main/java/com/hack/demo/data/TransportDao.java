package com.hack.demo.data;

import com.hack.demo.domain.Transport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class TransportDao {

    @Autowired
    private JdbcClient jdbcClient;

    public void deleteAll() {
        jdbcClient.sql(TransportMapper.DELETE_ALL)
                .update();
    }
    public void batchInsert(List<Transport> transports, int batchSize) {
        for (int i = 0; i < transports.size(); i += batchSize) {
            List<Transport> batch = transports.subList(i, Math.min(i + batchSize, transports.size()));
            batchInsertChunk(batch);
        }
    }

    private void batchInsertChunk(List<Transport> batch) {
        batch.forEach(
                transport -> jdbcClient.sql(TransportMapper.INSERT)
                        .param(transport.getTransportNumber())
                        .param(java.sql.Date.valueOf(transport.getTransportDate()))
                        .param(java.sql.Time.valueOf(transport.getTransportStart()))
                        .param(java.sql.Time.valueOf(transport.getTransportEnd()))
                        .param(transport.getFromLocation())
                        .param(transport.getFromStreet())
                        .param(transport.getToLocation())
                        .param(transport.getToStreet())
                        .param(transport.getTransportType())
                        .param(transport.getReferenceNumber())
                        .param(transport.getTotalKm())
                        .param(transport.getFleetClass())
                        .param(transport.getSectionLocation())
                        .update()
        );
    }


}

