from dataclasses import dataclass
from typing import Protocol

@dataclass
class Flight:
    flight_id: str
    flight_name: str


class Database(Protocol):
    async def query(self, sql: str) -> list[Flight]: ...


async def get_flight_schedule(flight_id: str, database: Database) -> list[Flight]:
    # TODO: implement me
    return []
