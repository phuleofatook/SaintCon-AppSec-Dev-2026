export interface PassengerProfile {
  displayName: string;
  message: string;
}

export function renderProfile(profile: PassengerProfile): string {
  return `<main>
    <h1>${escapeHtml(profile.displayName)}</h1>
    <p class="profile-message">${profile.message}</p>
  </main>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
