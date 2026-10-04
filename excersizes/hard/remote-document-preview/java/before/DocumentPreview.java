import java.util.concurrent.CompletionStage;

public class DocumentPreview {
    @FunctionalInterface
    public interface Fetch {
        CompletionStage<String> get(String url);
    }

    private static final String DOCUMENT_URL = "https://docs.spaceways.example/crew-handbook";

    public static CompletionStage<String> previewDocument(Fetch fetch) {
        return fetch.get(DOCUMENT_URL);
    }
}
