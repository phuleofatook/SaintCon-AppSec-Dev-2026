from dataclasses import dataclass

@dataclass
class OrderDto:
    id: str
    customer_id: str
    total: float
    status: str
