import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class ScheduleFetcher {
    public record Flight(String flightId, String flightName) {}

    public static List<Flight> getFlightSchedule(Connection connection, String flightId)
            throws SQLException {
        // TODO: implement me
        return List.of();
    }
}
