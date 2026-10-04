import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Optional;

public class SusFinder {
    public record Person(int personId, String firstName, String lastName, boolean sus, String role) {}

    public static Optional<Person> getSuspiciousCrew(Connection connection, String personId)
            throws SQLException {
        String sql = "SELECT p.person_id, p.first_name, p.last_name, p.sus, r.title "
                + "FROM person p JOIN customers c USING (person_id) JOIN role r USING (person_id) "
                + "WHERE p.person_id = " + personId + " AND p.sus";
        try (Statement statement = connection.createStatement();
             ResultSet row = statement.executeQuery(sql)) {
            if (!row.next()) return Optional.empty();
            return Optional.of(new Person(row.getInt("person_id"), row.getString("first_name"),
                    row.getString("last_name"), row.getBoolean("sus"), row.getString("title")));
        }
    }
}
