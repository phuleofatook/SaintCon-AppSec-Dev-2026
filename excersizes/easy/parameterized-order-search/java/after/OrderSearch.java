import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderSearch {
    public record Order(String id, String passengerName) {}

    public static List<Order> searchOrders(Connection connection, String nameFragment)
            throws SQLException {
        String sql = "SELECT id, passenger_name FROM orders WHERE passenger_name ILIKE ?";
        List<Order> orders = new ArrayList<>();
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, "%" + nameFragment + "%");
            try (ResultSet rows = statement.executeQuery()) {
                while (rows.next()) orders.add(new Order(rows.getString("id"), rows.getString("passenger_name")));
            }
        }
        return orders;
    }
}
