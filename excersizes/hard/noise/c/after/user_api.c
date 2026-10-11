#include <stdlib.h>
#include <string.h>

typedef struct { const char *id; const char *name; } User;

User get_user(const char *id) {
    return (User){ id, "Example User" };
}

int update_user(const char *id, const char *name) {
    return id != NULL && name != NULL;
}
