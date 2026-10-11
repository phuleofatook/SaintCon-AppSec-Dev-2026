from dataclasses import dataclass

@dataclass
class UserDto:
    id: int
    display_name: str
    email: str
    role: str
