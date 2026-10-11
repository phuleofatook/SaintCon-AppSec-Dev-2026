#ifndef USER_PREFERENCES_H
#define USER_PREFERENCES_H

typedef struct {
    const char *user_id;
    const char *timezone;
    int digest_enabled;
} UserPreferences;

#endif
