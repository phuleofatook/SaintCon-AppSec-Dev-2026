from dataclasses import dataclass

@dataclass
class PaginationDto:
    offset: int
    limit: int
    total: int
