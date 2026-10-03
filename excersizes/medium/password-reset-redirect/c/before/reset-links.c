#include <stdio.h>
#include <stdlib.h>

const char *RESET_ORIGIN = "https://account.spaceways.example";

char *buildResetLink(const char *token) {
    char *url = malloc(2048);

    snprintf(
        url,
        2048,
        "%s/reset-password?token=%s",
        RESET_ORIGIN,
        token
    );

    return url;
}