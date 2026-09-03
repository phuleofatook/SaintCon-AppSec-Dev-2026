const RESET_ORIGIN = 'https://account.spaceways.example';

export function buildResetLink(token: string): string {
  const url = new URL('/reset-password', RESET_ORIGIN);
  url.searchParams.set('token', token);
  return url.toString();
}
