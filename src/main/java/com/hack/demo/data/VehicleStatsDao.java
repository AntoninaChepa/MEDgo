package com.hack.demo.data;

import com.hack.demo.domain.VehicleStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class VehicleStatsDao {

    @Autowired
    private JdbcClient jdbcClient;

    public void batchInsertVehicleStats(List<VehicleStats> vehicleStatsList) {
        vehicleStatsList.stream().forEach(
                vehicleStats -> {
                    jdbcClient.sql(VehicleStatsMapper.INSERT_VEHICLE_STATS)
                            .param(vehicleStats.getFleetClass())
                            .param(vehicleStats.getRecliningSeats())
                            .param(vehicleStats.getSeat())
                            .param(vehicleStats.getStanding())
                            .param(vehicleStats.getStaff())
                            .param(vehicleStats.getMaxPassengers())
                            .update()
                    ;
                }
        );

    }

    public void deleteAll() {
        jdbcClient.sql(VehicleStatsMapper.DELETE_ALL)
                .update();
    }

    /*
    {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                VehicleStats vehicleStats = vehicleStatsList.get(i);
                ps.setString(1, vehicleStats.getFleetClass());
                ps.setInt(2, vehicleStats.getRecliningSeats());
                ps.setInt(3, vehicleStats.getSeat());
                ps.setInt(4, vehicleStats.getStanding());
                ps.setInt(5, vehicleStats.getStaff());
                ps.setInt(6, vehicleStats.getMaxPassengers());
            }

            @Override
            public int getBatchSize() {
                return vehicleStatsList.size();
            }
     */

}
