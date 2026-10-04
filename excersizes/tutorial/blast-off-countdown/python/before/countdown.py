from collections.abc import Callable

STARTING_SECONDS = 10


def create_countdown() -> Callable[[], str]:
    remaining_seconds = STARTING_SECONDS

    def next_value() -> str:
        # TODO: implement me
        return "implement me"

    return next_value
