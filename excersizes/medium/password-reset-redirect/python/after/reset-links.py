from urllib.parse import urlencode, urljoin

RESET_ORIGIN = "https://account.spaceways.example"


def build_reset_link(token: str, return_to: str | None = None) -> str:
    url = urljoin(RESET_ORIGIN, "/reset-password")

    params = {"token": token}
    if return_to:
        params["returnTo"] = return_to

    return f"{url}?{urlencode(params)}"