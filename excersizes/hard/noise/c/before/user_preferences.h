#ifndef USER_PREFERENCES_H
#define USER_PREFERENCES_H

typedef struct {
    long user_id;
    const char *timezone;
    int digest_enabled;
} UserPreferences;

#endif
