#include <libpq-fe.h>
#include <time.h>

#include "flight-builder.h"

PGconn *pool;

typedef struct {
    char *flightId; /* UUID */
    char *flightName;

    int departureId;
    char *departureName;

    int destinationId;
    char *destinationName;

    time_t takeOff;
    time_t landing;
} Flight;

typedef struct {
    Flight *rows;
    int length;
} FlightArray;

FlightArray getflightSchedule(const char *flightId) {
    char sql[2048];

    snprintf(
        sql,
        sizeof(sql),
        "SELECT f.flight_id, f.flight_name, f.takeoff, f.landing, "
        "   depart.planet_id AS departureId, depart.planet_name AS departureName, "
        "   dest.planet_id AS destinationId, dest.planet_name AS destinationName "
        "FROM flight f "
        "   JOIN planets depart USING (planet_id) "
        "   JOIN planets dest USING (planet_id) "
        "WHERE f.flight_id = %s",
        flightId
    );

    PGresult *result = PQexec(pool, sql);

    return (FlightArray){ NULL, 0 };
}