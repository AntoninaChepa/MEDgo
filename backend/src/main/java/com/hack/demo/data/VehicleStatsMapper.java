package com.hack.demo.data;

import com.hack.demo.domain.VehicleStats;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class VehicleStatsMapper implements RowMapper<VehicleStats> {
    public static final String SELECT_ALL = "SELECT * FROM vehicle_stats";
    public static final String SELECT_BY_FLEET_CLASS = "SELECT * FROM vehicle_stats WHERE fleet_class = ?";

    public static final String INSERT_VEHICLE_STATS =
            "INSERT INTO vehicle_stats (fleet_class, reclining_seats, seat, standing, staff, max_passengers) VALUES (?, ?, ?, ?, ?, ?)";
    public static final String DELETE_ALL = "DELETE FROM vehicle_stats";

    @Override
    public VehicleStats mapRow(ResultSet rs, int rowNum) throws SQLException {
        VehicleStats vehicleStats = new VehicleStats();
        vehicleStats.setFleetClass(rs.getString("fleet_class"));
        vehicleStats.setRecliningSeats(rs.getInt("reclining_seats"));
        vehicleStats.setSeat(rs.getInt("seat"));
        vehicleStats.setStanding(rs.getInt("standing"));
        vehicleStats.setStaff(rs.getInt("staff"));
        vehicleStats.setMaxPassengers(rs.getInt("max_passengers"));
        return vehicleStats;
    }
}
