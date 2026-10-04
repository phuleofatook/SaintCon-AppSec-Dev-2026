export interface HttpResponse {
  text(): Promise<string>;
}

export type Fetch = (url: string) => Promise<HttpResponse>;

export async function previewDocument(
  documentUrl: string,
  fetch: Fetch,
): Promise<string> {
  const response = await fetch(documentUrl);
  return response.text();
}
