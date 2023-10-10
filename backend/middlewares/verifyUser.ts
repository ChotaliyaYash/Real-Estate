import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload {
    id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            const error = new Error("User not authorized");
            error.name = "unauthorizederror";
            throw error;
        }

        const decoded: jwtPayload = jwt.verify(token, process.env.JWT_SECRET ?? "") as jwtPayload;

        if (!decoded) {
            const error = new Error("User not authorized");
            error.name = "unauthorizederror";
            throw error;
        }

        req.body.verifiedId = decoded.id;
        next();
    } catch (error) {
        next(error);
    }
}