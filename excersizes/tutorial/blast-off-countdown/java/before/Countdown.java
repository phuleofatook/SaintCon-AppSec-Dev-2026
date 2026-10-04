import java.util.concurrent.atomic.AtomicInteger;

public class Countdown {
    private static final int STARTING_SECONDS = 10;

    public static java.util.function.Supplier<String> createCountdown() {
        AtomicInteger remainingSeconds = new AtomicInteger(STARTING_SECONDS);
        return () -> "implement me";
    }
}
