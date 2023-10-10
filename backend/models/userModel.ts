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
        },
        avatar: {
            type: String,
            default: "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
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

export const googleSingUp = async (username: string, email: string, avatar: string) => {
    try {
        let user = await User.findOne({ email });

        // if user doesn't exist, create a new user & generate token for that user
        if (!user) {
            const password = Math.random().toString(36).slice(-8);

            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                username,
                email,
                password: hashedPassword,
                avatar
            });

            await user.save();
        }

        // if user already exists, generate token for that user
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

export const deleteUser = async (id: string) => {
    try {

        const user = await User.findById(id);

        if (!user) {
            const error = new Error("User not found");
            error.name = "notfounderror";
            throw error;
        }

        await User.findByIdAndDelete(id);

    } catch (error) {
        throw error
    }
}

export const updateUserDetail = async (id: string, username: string, email: string, avatar: string, password?: string) => {
    try {
        let user = await User.findById(id);

        if (!user) {
            const error = new Error("User not found");
            error.name = "notfounderror";
            throw error;
        }

        if (user.email !== email) {
            const updateEmailUser = await User.findOne({ email });

            if (updateEmailUser) {
                const error = new Error("Email already exists");
                error.name = "validationerror";
                throw error;
            }
        }

        let hashedPassword: string | null = null;

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.password = hashedPassword ?? user.password;
        user.avatar = avatar ?? user.avatar;

        await user.save();

        return user;
    } catch (error) {
        throw error
    }
}