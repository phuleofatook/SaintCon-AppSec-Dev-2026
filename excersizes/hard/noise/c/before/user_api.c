#include <stdlib.h>
#include <string.h>

typedef struct { long id; const char *name; } User;

User get_user(long id) {
    return (User){ id, "Example User" };
}

int update_user(long id, const char *name) {
    return id > 0 && name != NULL;
}
