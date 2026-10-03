#include "reset-link.h"

typedef void (*ResetEmailSender)(const char *email, const char *resetLink);

void requestPasswordReset(
    const char *email,
    const char *token,
    const char *returnTo,
    ResetEmailSender sendEmail
) {
    sendEmail(email, buildResetLink(token, returnTo));
}