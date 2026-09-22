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
    //TODO: implement me
    return [];
}