from dataclasses import dataclass
from html import escape


@dataclass
class PassengerProfile:
    display_name: str
    message: str


def render_profile(profile: PassengerProfile) -> str:
    return (
        "<main>"
        f"<h1>{escape(profile.display_name)}</h1>"
        f'<p class="profile-message">{profile.message}</p>'
        "</main>"
    )
