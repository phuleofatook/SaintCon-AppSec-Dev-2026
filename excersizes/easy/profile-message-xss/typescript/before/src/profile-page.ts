export interface PassengerProfile {
  displayName: string;
}

export function renderProfile(profile: PassengerProfile): string {
  return `<main><h1>${escapeHtml(profile.displayName)}</h1></main>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
