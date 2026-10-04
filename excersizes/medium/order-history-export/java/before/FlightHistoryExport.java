import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

public class FlightHistoryExport {
    public record FlightHistory(String id, String passengerId, String csv) {}
    public record SignedInPassenger(String id) {}

    public interface FlightHistoryRepository {
        CompletionStage<List<FlightHistory>> findByPassengerId(String passengerId);
    }

    public static CompletionStage<String> exportFlightHistory(
            SignedInPassenger currentUser, FlightHistoryRepository repository) {
        return repository.findByPassengerId(currentUser.id()).thenApply(histories ->
                histories.stream().map(FlightHistory::csv).collect(Collectors.joining("\n")));
    }
}
