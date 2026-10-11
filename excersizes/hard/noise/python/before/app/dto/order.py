from dataclasses import dataclass

@dataclass
class OrderDto:
    id: int
    customer_id: int
    total: float
    status: str
