#include <libpq-fe.h>

#include "person-builder.h"

PGconn *pool;

typedef struct {
    int personId;
    char *firstName;
    char *lastName;
    int sus;
    char *role;
} Person;

Person *getSuspiciousCrew(const char *personId) {
    char sql[2048];

    snprintf(
        sql,
        sizeof(sql),
        "SELECT p.person_id, p.first_name, p.last_name, p.sus, r.title "
        "FROM person p "
        "   JOIN customers c USING (person_id) "
        "   JOIN role r USING (person_id) "
        "WHERE p.person_id = %s "
        "   AND NOT p.sus",
        personId
    );

    PGresult *result = PQexec(pool, sql);

    if (PQntuples(result) == 0) {
        return NULL;
    }

    return buildPerson(result, 0);
}