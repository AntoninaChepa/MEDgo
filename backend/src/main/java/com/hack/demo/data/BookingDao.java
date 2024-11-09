package com.hack.demo.data;

import com.hack.demo.domain.Booking;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public class BookingDao {

    private JdbcTemplate jdbcTemplate;

    // Costruttore
    public BookingDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Mapper per mappare il risultato della query al POJO Booking
    private RowMapper<Booking> bookingRowMapper = new RowMapper<Booking>() {
        @Override
        public Booking mapRow(ResultSet rs, int rowNum) throws SQLException {
            Booking booking = new Booking();
            booking.setId(rs.getLong("id"));
            booking.setNome(rs.getString("nome"));
            booking.setCognome(rs.getString("cognome"));
            booking.setTelefono(rs.getString("telefono"));
            booking.setLocalitaPartenza(rs.getString("localita_partenza"));
            booking.setCoordinatePartenza(rs.getString("coordinate_partenza"));
            booking.setLocalitaArrivo(rs.getString("localita_arrivo"));
            booking.setPosizioneArrivo(rs.getString("posizione_arrivo"));
            booking.setDataVisita(rs.getDate("data_visita").toLocalDate());
            booking.setOraVisita(rs.getTime("ora_visita").toLocalTime());
            booking.setTipoPosto(rs.getString("tipo_posto"));
            booking.setStatoPaziente(rs.getString("stato_paziente"));
            booking.setIsUrgente(rs.getLong("is_urgente"));
            return booking;
        }
    };

    // 1. Metodo per ottenere tutte le prenotazioni
    public List<Booking> getAllBookings() {
        String sql = "SELECT * FROM booking";
        return jdbcTemplate.query(sql, bookingRowMapper);
    }

    // 2. Metodo per ottenere una prenotazione tramite ID
    public Optional<Booking> getBookingById(long id) {
        String sql = "SELECT * FROM booking WHERE id = ?";
        try {
            Booking booking = jdbcTemplate.queryForObject(sql, new Object[]{id}, bookingRowMapper);
            return Optional.ofNullable(booking);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();  // Se non trova il risultato
        }
    }

    // 3. Metodo per inserire una nuova prenotazione
    public int insertBooking(Booking booking) {
        String sql = "INSERT INTO public.booking(" +
                " nome, telefono, localita_partenza, coordinate_partenza, localita_arrivo, posizione_arrivo, data_visita, ora_visita, tipo_posto, stato_paziente, is_urgente, cognome)" +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        return jdbcTemplate.update(sql, booking.getNome(), booking.getTelefono(),
                booking.getLocalitaPartenza(), booking.getCoordinatePartenza(), booking.getLocalitaArrivo(),
                booking.getPosizioneArrivo(), booking.getDataVisita(), booking.getOraVisita(), booking.getTipoPosto(),
                booking.getStatoPaziente(), booking.getIsUrgente(), booking.getCognome());
    }

    // 4. Metodo per aggiornare una prenotazione esistente
    public int updateBooking(Booking booking) {
        String sql = "UPDATE public.booking " +
                " SET id=?, nome=?, telefono=?, localita_partenza=?, coordinate_partenza=?, localita_arrivo=?, posizione_arrivo=?, data_visita=?, ora_visita=?, tipo_posto=?, stato_paziente=?, is_urgente=?, cognome=? " +
                " WHERE  id = ?";
        return jdbcTemplate.update(sql, booking.getNome(), booking.getTelefono(),
                booking.getLocalitaPartenza(), booking.getCoordinatePartenza(), booking.getLocalitaArrivo(),
                booking.getPosizioneArrivo(), booking.getDataVisita(), booking.getOraVisita(), booking.getTipoPosto(),
                booking.getStatoPaziente(), booking.getIsUrgente(), booking.getCognome(), booking.getId());
    }

    // 5. Metodo per eliminare una prenotazione tramite ID
    public int deleteBooking(long id) {
        String sql = "DELETE FROM booking WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public List<Booking> getBookingsByDate(LocalDate dataVisita) {
        String sql = "SELECT * FROM booking WHERE data_visita = ?";
        return jdbcTemplate.query(sql, bookingRowMapper, dataVisita);
    }

    public int updateStatoPaziente(long id, String nuovoStato) {
        String sql = "UPDATE booking SET stato_paziente = ? WHERE id = ?";
        return jdbcTemplate.update(sql, nuovoStato, id);
    }

}
