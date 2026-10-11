import { Pool } from 'pg';
import { buildFlight } from './flight-builder';

const pool = new Pool();

export interface Flight {
    flightId: string; //UUID
    flightName: string;

    departureId: number;
    departureName: string;

    destinationId: number;
    destinationName: string;

    takeOff: Date;
    landing: Date;
}

export async function getflightSchedule(flightId: string): Promise<Array<Flight>> {
   const sql = `
        SELECT f.flight_id, f.flight_name, f.takeoff, f.landing,
            depart.planet_id AS departureId, 
            depart.planet_name AS departureName,
            dest.planet_id AS destinationId, 
            dest.planet_name AS destinationName
        FROM flight f
            JOIN planets depart USING (planet_id)
            JOIN planets dest USING (planet_id)            
        WHERE f.flight_id = ${flightId}
    `;

    const result = await pool.query<Flight>(sql);

    return result.rows;
}