from collections.abc import Callable

STARTING_SECONDS = 10


def create_countdown() -> Callable[[], str]:
    remaining_seconds = STARTING_SECONDS

    def next_value() -> str:
        nonlocal remaining_seconds
        remaining_seconds += 1
        if remaining_seconds == 0:
            return "Blast off!"
        return str(remaining_seconds)

    return next_value
