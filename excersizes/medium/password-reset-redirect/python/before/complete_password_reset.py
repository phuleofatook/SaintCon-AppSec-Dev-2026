from collections.abc import Callable


def complete_password_reset(redirect: Callable[[str], None]) -> None:
    redirect("/account")
