import { Request, Response, NextFunction } from 'express';
import { createUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            next(errorHandler(400, "all fields are required"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(username, email, hashedPassword);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(errorHandler(500, error as string));
    }
}
