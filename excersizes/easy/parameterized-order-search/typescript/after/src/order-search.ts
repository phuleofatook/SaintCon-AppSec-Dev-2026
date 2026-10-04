export interface Database {
  query<T>(sql: string, values: unknown[]): Promise<{ rows: T[] }>;
}

export interface Order {
  id: string;
  passengerName: string;
}

export async function searchOrders(
  nameFragment: string,
  database: Database,
): Promise<Order[]> {
  const result = await database.query<Order>(
    `SELECT id, passenger_name AS "passengerName"
      FROM orders
      WHERE passenger_name ILIKE $1`,
    [`%${nameFragment}%`],
  );

  return result.rows;
}
