import java.util.concurrent.CompletionStage;

public class FlightHistoryExport {
    public record FlightHistory(String id, String passengerId, String csv) {}
    public record SignedInPassenger(String id) {}

    public interface FlightHistoryRepository {
        CompletionStage<FlightHistory> findByIdAndPassengerId(String historyId, String passengerId);
    }

    public static CompletionStage<String> exportFlightHistory(
            SignedInPassenger currentUser, String historyId, FlightHistoryRepository repository) {
        return repository.findByIdAndPassengerId(historyId, currentUser.id()).thenApply(history -> {
            if (history == null) return null;
            return history.csv();
        });
    }
}
