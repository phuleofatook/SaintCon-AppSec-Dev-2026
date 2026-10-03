from urllib.parse import urlencode, urljoin

RESET_ORIGIN = "https://account.spaceways.example"


def build_reset_link(token: str) -> str:
    url = urljoin(RESET_ORIGIN, "/reset-password")
    return f"{url}?{urlencode({'token': token})}"