from dataclasses import dataclass

@dataclass
class AddressDto:
    street: str
    city: str
    state: str
    zip_code: str
