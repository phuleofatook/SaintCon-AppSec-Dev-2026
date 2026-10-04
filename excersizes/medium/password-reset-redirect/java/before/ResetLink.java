import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ResetLink {
    private static final String RESET_ORIGIN = "https://account.spaceways.example";

    public static String buildResetLink(String token) {
        return RESET_ORIGIN + "/reset-password?token="
                + URLEncoder.encode(token, StandardCharsets.UTF_8);
    }
}
