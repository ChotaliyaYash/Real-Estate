import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/database'

dotenv.config();

// Init express & Variables declaration
const app = express();
const port = process.env.PORT ?? 3000;
const url: string = process.env.MONGO_URI ?? "";

app.use(express.json());

// Routes

// @desc    user routes
import userRoute from './routers/userRoute';
app.use('/api/v1', userRoute);

// Error handling
type errorReturn = {
    statusCode: number,
    error: Error,
}

app.use((err: errorReturn, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ?? 500;

    const message = err.error.message ?? "Internal server error";

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