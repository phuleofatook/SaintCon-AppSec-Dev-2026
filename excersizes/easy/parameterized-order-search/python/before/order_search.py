from typing import Any, Protocol


class Database(Protocol):
    def query(self, sql: str) -> list[dict[str, Any]]: ...


def search_orders(name_fragment: str, database: Database) -> list[dict[str, Any]]:
    sql = f"""SELECT id, passenger_name
        FROM orders
        WHERE passenger_name ILIKE '%{name_fragment}%'"""
    return database.query(sql)
