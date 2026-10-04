import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class ResetLink {
    private static final String RESET_ORIGIN = "https://account.spaceways.example";

    public static String buildResetLink(String token, String returnTo) {
        String link = RESET_ORIGIN + "/reset-password?token="
                + URLEncoder.encode(token, StandardCharsets.UTF_8);
        if (returnTo != null && !returnTo.isEmpty()) {
            link += "&returnTo=" + URLEncoder.encode(returnTo, StandardCharsets.UTF_8);
        }
        return link;
    }
}
