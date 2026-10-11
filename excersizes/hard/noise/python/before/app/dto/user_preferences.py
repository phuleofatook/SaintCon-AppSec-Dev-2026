from dataclasses import dataclass

@dataclass
class UserPreferencesDto:
    user_id: int
    timezone: str
    digest_enabled: bool
