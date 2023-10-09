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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode;
    switch (err.message) {
        case "bad request":
            statusCode = 400;
            break;
        default:
            statusCode = 500;
            break;
    }

    const message = err.message ?? "Internal server error";

    res.status(statusCode).json({
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