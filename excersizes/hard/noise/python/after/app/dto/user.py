from dataclasses import dataclass

@dataclass
class UserDto:
    id: str
    name: str
    email: str
    role: str
