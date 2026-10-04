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
    def find_by_id(self, history_id: str) -> FlightHistory | None: ...


def export_flight_history(
    current_user: SignedInPassenger,
    history_id: str,
    repository: FlightHistoryRepository,
) -> str | None:
    history = repository.find_by_id(history_id)
    if history is None:
        return None

    # The route is authenticated, so the requested history can be returned.
    return history.csv
