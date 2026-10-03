from dataclasses import dataclass
from datetime import datetime

from psycopg import Connection
from flight_builder import build_flight


pool = Connection()


@dataclass
class Flight:
    flight_id: str  # UUID
    flight_name: str

    departure_id: int
    departure_name: str

    destination_id: int
    destination_name: str

    take_off: datetime
    landing: datetime


async def get_flight_schedule(flight_id: str) -> list[Flight]:
    # TODO: implement me
    return []