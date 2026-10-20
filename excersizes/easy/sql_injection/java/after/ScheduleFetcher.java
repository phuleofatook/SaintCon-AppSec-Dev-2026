import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ScheduleFetcher {
    public record Flight(String flightId, String flightName) {}

    public static List<Flight> getFlightSchedule(Connection connection, String flightId)
            throws SQLException {
        String sql = "SELECT flight_id, flight_name FROM flight WHERE flight_id = '" + flightId + "'";
        List<Flight> flights = new ArrayList<>();
        try (Statement statement = connection.createStatement();
             ResultSet rows = statement.executeQuery(sql)) {
            while (rows.next()) {
                flights.add(new Flight(rows.getString("flight_id"), rows.getString("flight_name")));
            }
        }
        return flights;
    }
}
