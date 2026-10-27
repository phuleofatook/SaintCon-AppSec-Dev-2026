import java.util.concurrent.CompletionStage;

public class FlightHistoryExport {
    public record FlightHistory(String id, String passengerId, String csv) {}
    public record SignedInPassenger(String id) {}

    public interface FlightHistoryRepository {
        CompletionStage<FlightHistory> findById(String historyId);
    }

    public static CompletionStage<String> exportFlightHistory(
            SignedInPassenger currentUser, String historyId, FlightHistoryRepository repository) {
        return repository.findById(historyId).thenApply(history -> {
            if (history == null) return null;
            return history.csv();
        });
    }
}
