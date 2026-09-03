const RESET_ORIGIN = 'https://account.spaceways.example';

export function buildResetLink(token: string, returnTo?: string): string {
  const url = new URL('/reset-password', RESET_ORIGIN);
  url.searchParams.set('token', token);

  if (returnTo) {
    url.searchParams.set('returnTo', returnTo);
  }

  return url.toString();
}
