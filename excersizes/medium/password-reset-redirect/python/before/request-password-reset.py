from collections.abc import Awaitable, Callable

from reset_link import build_reset_link


ResetEmailSender = Callable[[str, str], Awaitable[None]]


async def request_password_reset(
    email: str,
    token: str,
    send_email: ResetEmailSender,
) -> None:
    await send_email(email, build_reset_link(token))