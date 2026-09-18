import { Pool } from 'pg';
import { buildPerson } from './person-builder';

const pool = new Pool();

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    sus: boolean;
    role: string;
}

export async function getSuspiciousCrew(personId: string): Promise<Person | null> {
    const sql = `
        SELECT p.person_id, p.first_name, p.last_name, p.sus, r.title
        FROM person p,
            customers c USING (person_id)
            role r USING (person_id)
        WHERE p.person_id = ${personId}
			AND NOT p.sus
    `;

    const result = await pool.query(sql);

    if (result.rows.length === 0) {
        return null;
    }

    return buildPerson(result.rows[0]);
}