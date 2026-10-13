#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char *RESET_ORIGIN = "https://account.spaceways.example";

static int isUnreserved(unsigned char character) {
    return (character >= 'A' && character <= 'Z') ||
           (character >= 'a' && character <= 'z') ||
           (character >= '0' && character <= '9') ||
           character == '-' || character == '_' ||
           character == '.' || character == '~';
}

static char *urlEncode(const char *value) {
    static const char HEX[] = "0123456789ABCDEF";
    size_t inputLength = strlen(value);
    char *encoded = malloc(inputLength * 3 + 1);
    char *output = encoded;

    if (encoded == NULL) {
        return NULL;
    }

    for (size_t index = 0; index < inputLength; index++) {
        unsigned char character = (unsigned char)value[index];
        if (isUnreserved(character)) {
            *output++ = (char)character;
        } else {
            *output++ = '%';
            *output++ = HEX[character >> 4];
            *output++ = HEX[character & 0x0F];
        }
    }

    *output = '\0';
    return encoded;
}

char *buildResetLink(const char *token, const char *returnTo) {
    char *encodedToken = urlEncode(token);
    char *encodedReturnTo = returnTo != NULL && returnTo[0] != '\0'
        ? urlEncode(returnTo)
        : NULL;

    if (encodedToken == NULL || (returnTo != NULL && returnTo[0] != '\0' && encodedReturnTo == NULL)) {
        free(encodedToken);
        free(encodedReturnTo);
        return NULL;
    }

    int length = snprintf(
        NULL,
        0,
        "%s/reset-password?token=%s%s%s",
        RESET_ORIGIN,
        encodedToken,
        encodedReturnTo == NULL ? "" : "&returnTo=",
        encodedReturnTo == NULL ? "" : encodedReturnTo
    );
    char *url = length < 0 ? NULL : malloc((size_t)length + 1);

    if (url != NULL) {
        snprintf(
            url,
            (size_t)length + 1,
            "%s/reset-password?token=%s%s%s",
            RESET_ORIGIN,
            encodedToken,
            encodedReturnTo == NULL ? "" : "&returnTo=",
            encodedReturnTo == NULL ? "" : encodedReturnTo
        );
    }

    free(encodedToken);
    free(encodedReturnTo);
    return url;
}
