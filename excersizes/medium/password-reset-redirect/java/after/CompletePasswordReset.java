import java.util.function.Consumer;

public class CompletePasswordReset {
    public static void completePasswordReset(String returnTo, Consumer<String> redirect) {
        redirect.accept(returnTo == null || returnTo.isEmpty() ? "/account" : returnTo);
    }
}
