#include <stdlib.h>

extern int update_user(const char *id, const char *name);
extern void send_user(const char *id);

int put_user(const char *path_id, const char *name) {
    return update_user(path_id, name);
}

void get_user_handler(const char *path_id) {
    send_user(path_id);
}
