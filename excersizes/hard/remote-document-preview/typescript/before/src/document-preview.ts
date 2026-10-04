export interface HttpResponse {
  text(): Promise<string>;
}

export type Fetch = (url: string) => Promise<HttpResponse>;

const DOCUMENT_URL = "https://docs.spaceways.example/crew-handbook";

export async function previewDocument(
  fetch: Fetch,
): Promise<string> {
  const response = await fetch(DOCUMENT_URL);
  return response.text();
}
