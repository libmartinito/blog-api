import { Pool } from "pg";
import dotenv from 'dotenv';
import type { Query } from "../types";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

export const query = async (query: Query): Promise<any[]> => {
    pool.connect();
    try {
        const res = await pool.query(query);
        return res.rows;
    } catch(e) {
        console.log(e);
        throw new Error();
    }
}
