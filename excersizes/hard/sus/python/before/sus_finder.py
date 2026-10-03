from dataclasses import dataclass

from psycopg_pool import AsyncConnectionPool
from person_builder import build_person


pool = AsyncConnectionPool()


@dataclass
class Person:
    personId: int
    firstName: str
    lastName: str
    sus: bool
    role: str


async def get_suspicious_crew(personId: str) -> Person | None:
    sql = f"""
        SELECT p.person_id, p.first_name, p.last_name, p.sus, r.title
        FROM person p
            JOIN customers c USING (person_id)
            JOIN role r USING (person_id)
        WHERE p.person_id = {personId}
            AND NOT p.sus
    """

    result = await pool.query(sql)

    if len(result.rows) == 0:
        return None

    return build_person(result.rows[0])