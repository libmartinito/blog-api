import { Request, Response } from 'express';
import * as db from '../db/auth.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const oldUser: User = await db.getUser(email);
        if (oldUser) {
            res.status(400).send({
                message: "User already exists in the system. Please login."
            })
        }
        req.body.password = bcrypt.hash(req.body.password, 8);
        const user = await db.registerUser(email, req.body.password);
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user.user_id }, secret as string);
        res.status(200).send({ user, token });
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
}
