from collections.abc import Callable


def complete_password_reset(
    return_to: str | None, redirect: Callable[[str], None]
) -> None:
    redirect(return_to or "/account")
