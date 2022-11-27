import { query } from './index';
import type { User } from '../types';

const now = new Date().toISOString();

export const getUser = async (email: string): Promise<User> => {
    const text: string = `
        SELECT user_id, email, password
        FROM "User" WHERE email = $1;
    `;
    const values: string[] = [email];
    const res = await query(text, values);
    return res[0];
}

export const registerUser = async (email: string, password: string): Promise<User> => {
    const text: string = `
        INSERT INTO "User" (email, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4);
    `;
    const values = [email, password, now, now];
    await query(text, values);
    return getUser(email);
}
