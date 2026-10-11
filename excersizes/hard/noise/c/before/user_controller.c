#include <stdlib.h>

extern int update_user(long id, const char *name);
extern void send_user(long id);

int put_user(const char *path_id, const char *name) {
    return update_user(strtol(path_id, NULL, 10), name);
}

void get_user_handler(const char *path_id) {
    send_user(strtol(path_id, NULL, 10));
}
