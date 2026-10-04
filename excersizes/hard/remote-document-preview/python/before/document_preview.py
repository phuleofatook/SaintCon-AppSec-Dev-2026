from collections.abc import Callable

DOCUMENT_URL = "https://docs.spaceways.example/crew-handbook"


def preview_document(fetch: Callable[[str], str]) -> str:
    return fetch(DOCUMENT_URL)
