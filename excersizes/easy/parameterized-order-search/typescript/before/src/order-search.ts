export interface Database {
  query<T>(sql: string): Promise<{ rows: T[] }>;
}

export interface Order {
  id: string;
  passengerName: string;
}

export async function searchOrders(
  nameFragment: string,
  database: Database,
): Promise<Order[]> {
  const sql = `SELECT id, passenger_name AS "passengerName"
    FROM orders
    WHERE passenger_name ILIKE '%${nameFragment}%'`;

  const result = await database.query<Order>(sql);
  return result.rows;
}
