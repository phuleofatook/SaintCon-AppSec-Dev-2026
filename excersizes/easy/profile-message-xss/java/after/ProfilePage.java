public class ProfilePage {
    public record PassengerProfile(String displayName, String message) {}

    public static String renderProfile(PassengerProfile profile) {
        return "<main><h1>" + escapeHtml(profile.displayName()) + "</h1>"
                + "<p class=\"profile-message\">" + profile.message() + "</p></main>";
    }

    private static String escapeHtml(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&#39;");
    }
}
