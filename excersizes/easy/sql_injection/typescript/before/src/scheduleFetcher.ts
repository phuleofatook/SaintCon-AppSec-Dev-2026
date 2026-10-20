import { Pool } from 'pg';

const pool = new Pool();

export interface Flight {
  flightId: string;
  flightName: string;
}

export async function getFlightSchedule(flightId: string): Promise<Flight[]> {
  // TODO: implement me
  return [];
}
