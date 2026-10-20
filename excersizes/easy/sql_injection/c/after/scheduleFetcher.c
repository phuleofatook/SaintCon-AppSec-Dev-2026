#include <libpq-fe.h>
#include <stdio.h>

PGconn *pool;

PGresult *getFlightSchedule(const char *flightId) {
    char sql[512];
    snprintf(
        sql,
        sizeof(sql),
        "SELECT flight_id, flight_name FROM flight WHERE flight_id = '%s'",
        flightId
    );
    return PQexec(pool, sql);
}
