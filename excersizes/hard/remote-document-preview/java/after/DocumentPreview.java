import java.util.concurrent.CompletionStage;

public class DocumentPreview {
    @FunctionalInterface
    public interface Fetch {
        CompletionStage<String> get(String url);
    }

    public static CompletionStage<String> previewDocument(String documentUrl, Fetch fetch) {
        return fetch.get(documentUrl);
    }
}
