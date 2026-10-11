from dataclasses import dataclass

@dataclass
class PaginationDto:
    page: int
    page_size: int
    total: int
