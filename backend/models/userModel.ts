import mongoose from "mongoose";

// Model creation
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
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
export const createUser = async (name: string, email: string, password: string) => {
    try {
        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

        return user;
    } catch (error) {
        throw new Error(error);
    }
};