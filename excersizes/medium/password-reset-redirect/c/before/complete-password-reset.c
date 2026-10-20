typedef void (*Redirect)(const char *location);

void completePasswordReset(Redirect redirect) {
    redirect("/account");
}
