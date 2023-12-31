import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/database'
import cookieParser from 'cookie-parser';

dotenv.config();

// Init express & Variables declaration
const app = express();
const port = process.env.PORT ?? 3000;
const url: string = process.env.MONGO_URI ?? "";

app.use(express.json());
app.use(cookieParser());

// Routes

// @desc    user routes
import userRoute from './routers/userRoute';
app.use('/api/v1/user', userRoute);

// @desc    list routes
import listernRouter from './routers/listRouter';
app.use('/api/v1/listing', listernRouter);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode: number;

    switch (err.name) {
        case "validationerror":
            statusCode = 403;
            break;

        case "notfounderror":
            statusCode = 404;
            break;

        case "unauthorizederror":
            statusCode = 401;
            break;

        default:
            statusCode = 500;
            break;
    }

    const message = err.message ?? "Something went wrong";

    return res.status(statusCode).json({
        success: false,
        message,
    })
})

// Start server
app.listen(port, async () => {
    // MongoDB connection
    await connectDB(url);

    // Server start
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
});