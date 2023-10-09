import mongoose from "mongoose";

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
        const user = new User({
            username,
            email,
            password,
        });


        await user.save();

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
};