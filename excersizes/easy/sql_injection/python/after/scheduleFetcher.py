from dataclasses import dataclass
from datetime import datetime

from psycopg_pool import AsyncConnectionPool
from flight_builder import build_flight


pool = AsyncConnectionPool()


@dataclass
class Flight:
    flightId: str  # UUID
    flightName: str

    departureId: int
    departureName: str

    destinationId: int
    destinationName: str

    takeOff: datetime
    landing: datetime


async def getflightSchedule(flightId: str) -> list[Flight]:
    sql = f"""
        SELECT f.flight_id, f.flight_name, f.takeoff, f.landing,
            depart.planet_id AS departureId, depart.planet_name AS departureName,
            dest.planet_id AS destinationId, dest.planet_name AS destinationName,
        FROM flight f
            JOIN planets depart USING (planet_id)
            JOIN planets dest USING (planet_id)
        WHERE f.flight_id = {flightId}
    """

    result = await pool.query(sql)

    return result.rows