import { Request, Response } from 'express';
import * as db from '../db/auth.db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../types'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await db.registerUser(email, hashedPassword);
        delete user.password;
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user.user_id }, secret as string);
        res.status(200).send({ user, token });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            message: "User already exists. Please login.",
        });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const oldUser: User = await db.getUser(email);
        if (!oldUser) {
            res.status(400).send({
                message: "User does not exist. Please register"
            });
        }
        const isPasswordMatch = bcrypt.compare(password, oldUser.password as string);
        if (!isPasswordMatch) {
            res.status(400).send({
                message: "Password does not match email. Please try again."
            });
        }
        delete oldUser.password;
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: oldUser.user_id }, secret as string);
        res.status(200).send({ user: oldUser, token });
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
}
