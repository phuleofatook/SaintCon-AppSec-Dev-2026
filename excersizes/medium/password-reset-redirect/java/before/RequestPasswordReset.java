import java.util.concurrent.CompletionStage;

public class RequestPasswordReset {
    @FunctionalInterface
    public interface ResetEmailSender {
        CompletionStage<Void> send(String email, String resetLink);
    }

    public static CompletionStage<Void> requestPasswordReset(
            String email, String token, ResetEmailSender sender) {
        return sender.send(email, ResetLink.buildResetLink(token));
    }
}
