from dataclasses import dataclass
from html import escape


@dataclass
class PassengerProfile:
    display_name: str


def render_profile(profile: PassengerProfile) -> str:
    return f"<main><h1>{escape(profile.display_name)}</h1></main>"
