typedef void (*Redirect)(const char *location);

void completePasswordReset(const char *returnTo, Redirect redirect) {
    redirect(returnTo != 0 && returnTo[0] != '\0' ? returnTo : "/account");
}
