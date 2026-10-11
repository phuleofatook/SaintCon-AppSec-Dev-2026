from dataclasses import dataclass

@dataclass
class UserPreferencesDto:
    user_id: str
    timezone: str
    digest_enabled: bool
