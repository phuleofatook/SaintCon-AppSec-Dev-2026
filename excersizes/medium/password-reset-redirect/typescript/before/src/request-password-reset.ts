import { buildResetLink } from './reset-link';

export type ResetEmailSender = (email: string, resetLink: string) => Promise<void>;

export async function requestPasswordReset(email: string, token: string, sendEmail: ResetEmailSender): Promise<void> {
  await sendEmail(email, buildResetLink(token));
}
