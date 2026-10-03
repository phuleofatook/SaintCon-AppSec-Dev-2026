#include "reset-link.h"

typedef void (*ResetEmailSender)(const char *email, const char *resetLink);

void requestPasswordReset(
    const char *email,
    const char *token,
    ResetEmailSender sendEmail
) {
    sendEmail(email, buildResetLink(token));
}