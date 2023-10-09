import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Model creation
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            unique: [true, "Name already exists"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

// creating funcationality

// create user
export const createUser = async (username: string, email: string, password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        return user;
    } catch (error: any) {
        throw error;
    }
};

export const authUser = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User not found");
            error.name = "notfounderror";
            throw error;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.name = "unauthorizederror";
            throw error;
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET ?? "",
            {
                expiresIn: "30d"
            }
        );

        return { token, user };

    } catch (error: any) {
        throw error;
    }
}