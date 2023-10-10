import { Request, Response, NextFunction } from 'express';
import { authUser, createUser, deleteUser, googleSingUp } from '../models/userModel';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            const error = new Error("Please provide all required fields");
            error.name = "validationerror";
            throw error;
        }

        const user = await createUser(username, email, password);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Please provide all required fields");
            error.name = "validationerror";
            throw error;
        }

        const data = await authUser(email, password);

        return res
            .cookie("token", data.token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
            .status(200).json({
                success: true,
                message: "User logged in successfully",
                data: data.user,
            })

    } catch (error) {
        next(error);
    }
}

export const googleSignUpUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, email, avatar } = req.body;

        if (!email || !avatar || !username) {
            const error = new Error("Please provide all required fields");
            error.name = "validationerror";
            throw error;
        }

        const data = await googleSingUp(username, email, avatar);

        return res
            .cookie("token", data.token, {
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            })
            .status(200).json({
                success: true,
                message: "User logged in successfully",
                data: data.user,
            })

    } catch (error) {
        next(error);
    }
}

export const deleteAUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await deleteUser(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}