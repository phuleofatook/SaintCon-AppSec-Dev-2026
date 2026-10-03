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
    Flight *flights;
    int length;
} FlightArray;

FlightArray getflightSchedule(const char *flightId) {
    /* TODO: implement me */
    return (FlightArray){ NULL, 0 };
}
