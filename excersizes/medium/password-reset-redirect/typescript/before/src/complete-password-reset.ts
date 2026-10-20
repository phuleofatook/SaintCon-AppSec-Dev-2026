export type Redirect = (location: string) => void;

export function completePasswordReset(redirect: Redirect): void {
  redirect('/account');
}
