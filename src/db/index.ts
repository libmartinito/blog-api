import { Pool } from "pg";
import dotenv from 'dotenv';
import type { Query } from "../types";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

export const query = async (text: string, values: any[] | null = null): Promise<any[]> => {
    pool.connect();
    const queryObj: Query = {
        text,
    };
    if (values) {
        queryObj.values = values;
    }
    try {
        const res = await pool.query(queryObj);
        return res.rows;
    } catch(e) {
        console.log(e);
        throw new Error();
    }
}
