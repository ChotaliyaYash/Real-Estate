import { Request, Response, NextFunction } from 'express';
import { createUser } from '../models/userModel';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            const error = new Error("Please fill all the fields");
            error.name = "bad request";
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(username, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        next(error);
    }
}
