import { Pool } from 'pg';

const pool = new Pool();

export interface Flight {
  flightId: string;
  flightName: string;
}

export async function getFlightSchedule(flightId: string): Promise<Flight[]> {
  const sql = `
    SELECT f.flight_id AS "flightId", f.flight_name AS "flightName"
    FROM flight f
    WHERE f.flight_id = '${flightId}'
  `;
  const result = await pool.query<Flight>(sql);
  return result.rows;
}
