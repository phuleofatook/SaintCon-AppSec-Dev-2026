import java.util.function.Consumer;

public class CompletePasswordReset {
    public static void completePasswordReset(Consumer<String> redirect) {
        redirect.accept("/account");
    }
}
