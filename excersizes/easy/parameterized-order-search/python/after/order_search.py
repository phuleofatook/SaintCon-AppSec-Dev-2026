from typing import Any, Protocol


class Database(Protocol):
    def query(self, sql: str, values: list[str]) -> list[dict[str, Any]]: ...


def search_orders(name_fragment: str, database: Database) -> list[dict[str, Any]]:
    sql = """SELECT id, passenger_name
        FROM orders
        WHERE passenger_name ILIKE %s"""
    return database.query(sql, [f"%{name_fragment}%"])
