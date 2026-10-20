export type Redirect = (location: string) => void;

export function completePasswordReset(returnTo: string | undefined, redirect: Redirect): void {
  redirect(returnTo || '/account');
}
