package com.hack.demo.data;

import java.sql.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import javax.sql.DataSource;

public class ScheduledRoutesDao {

    private final DataSource dataSource;

    // Constructor for injecting the DataSource dependency
    public ScheduledRoutesDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /**
     * Inserts a new ScheduledRoute record into the database.
     *
     * @param scheduledRoute The ScheduledRoute entity to insert
     * @return The ID of the newly inserted ScheduledRoute
     * @throws SQLException if a database access error occurs
     */
    public int insert(ScheduledRoute scheduledRoute) throws SQLException {
        String sql = "INSERT INTO public.scheduled_route (booking_id, orario_ritiro, veicolo, avvenuta_notifica) " +
                "VALUES (?, ?, ?, ?) RETURNING id";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, scheduledRoute.getBookingId());
            ps.setTime(2, Time.valueOf(scheduledRoute.getOrarioRitiro()));
            ps.setInt(3, scheduledRoute.getVeicolo());
            ps.setBoolean(4, scheduledRoute.getAvvenutaNotifica());

            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1); // Returns the generated ID
            } else {
                throw new SQLException("Inserting scheduled route failed, no ID obtained.");
            }
        }
    }

    /**
     * Retrieves all ScheduledRoute records from the database.
     *
     * @return A list of ScheduledRoute entities
     * @throws SQLException if a database access error occurs
     */
    public List<ScheduledRoute> selectAll() throws SQLException {
        List<ScheduledRoute> scheduledRoutes = new ArrayList<>();
        String sql = "SELECT id, booking_id, orario_ritiro, veicolo, avvenuta_notifica FROM public.scheduled_route";

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                ScheduledRoute route = ScheduledRoute.builder()
                        .id(rs.getInt("id"))
                        .bookingId(rs.getLong("booking_id"))
                        .orarioRitiro(rs.getTime("orario_ritiro").toLocalTime())
                        .veicolo(rs.getInt("veicolo"))
                        .avvenutaNotifica(rs.getBoolean("avvenuta_notifica"))
                        .build();
                scheduledRoutes.add(route);
            }
        }
        return scheduledRoutes;
    }
}
