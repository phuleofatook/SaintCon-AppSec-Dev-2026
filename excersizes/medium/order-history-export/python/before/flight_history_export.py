from dataclasses import dataclass
from typing import Protocol


@dataclass
class FlightHistory:
    id: str
    passenger_id: str
    csv: str


@dataclass
class SignedInPassenger:
    id: str


class FlightHistoryRepository(Protocol):
    def find_by_passenger_id(self, passenger_id: str) -> list[FlightHistory]: ...


def export_flight_history(
    current_user: SignedInPassenger, repository: FlightHistoryRepository
) -> str:
    histories = repository.find_by_passenger_id(current_user.id)
    return "\n".join(history.csv for history in histories)
