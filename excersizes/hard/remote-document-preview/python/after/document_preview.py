from collections.abc import Callable


def preview_document(document_url: str, fetch: Callable[[str], str]) -> str:
    return fetch(document_url)
