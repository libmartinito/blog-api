import { query } from './index';
import type { Query, User } from '../types';

export const getUser = async (email: string): Promise<User> => {
    const text: string = `SELECT (user_id, email) FROM "User" WHERE email = $1;`;
    const queryObj: Query = {
        text,
        values: [email],
        rowMode: 'array'
    };
    const res = await query(queryObj);
    return res[0];
}

export const registerUser = async (email: string, password: string): Promise<User> => {
    const text: string = `INSERT INTO (email, password) VALUES ($1, $2);`;
    const queryObj: Query = {
        text,
        values: [email, password],
        rowMode: 'array'
    };
    await query(queryObj);
    const user = getUser(email);
    return user;
}
