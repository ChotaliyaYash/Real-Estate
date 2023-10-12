import e from "express";
import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountedPrice: {
            type: Number,
            required: true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const List = mongoose.model("List", listSchema);

// connecting data

export interface ListModel {
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountedPrice: number;
    bathrooms: number;
    bedrooms: number;
    furnished: boolean;
    parking: boolean;
    type: string;
    offer: boolean;
    imageUrls: string[];
    userRef: string;
}

export const createList = async (data: ListModel) => {
    try {
        const list = new List(data);

        await list.save();

        return list;
    } catch (error) {
        throw error;
    }
}

export const getLists = async () => {
    try {
        const lists = await List.find();

        return lists;
    } catch (error) {
        throw error;
    }
}

// get user specific list
export const getUserSpecificList = async (id: string) => {
    try {
        const list = await List.find({ userRef: id });

        return list;
    } catch (error) {
        throw error;
    }
}

// delete user specific list
export const deleteList = async (id: string, userId: string) => {
    try {
        const list = await List.findById(id);

        if (!list) {
            const error = new Error("List not found");
            error.name = "notfounderror";
            throw error;
        }

        if (list.userRef.toString() !== userId) {
            const error = new Error("You are not authorized to delete this list");
            error.name = "unauthorizederror";
            throw error;
        }

        await List.findByIdAndDelete(id);

        return list;
    } catch (error) {
        throw error;
    }
}

// update user specific list
export const updateList = async (id: string, userId: string, data: ListModel) => {
    try {
        const list = await List.findById(id);

        if (!list) {
            const error = new Error("List not found");
            error.name = "notfounderror";
            throw error;
        }

        if (list.userRef.toString() !== userId) {
            const error = new Error("You are not authorized to update this list");
            error.name = "unauthorizederror";
            throw error;
        }

        list.name = data.name ?? list.name;
        list.description = data.description ?? list.description;
        list.address = data.address ?? list.address;
        list.discountedPrice = data.discountedPrice ?? list.discountedPrice;
        list.regularPrice = data.regularPrice ?? list.regularPrice;
        list.bathrooms = data.bathrooms ?? list.bathrooms;
        list.bedrooms = data.bedrooms ?? list.bedrooms;
        list.furnished = data.furnished ?? list.furnished;
        list.parking = data.parking ?? list.parking;
        list.type = data.type ?? list.type;
        list.offer = data.offer ?? list.offer;
        list.imageUrls = data.imageUrls ?? list.imageUrls;

        await list.save();

        return list;
    } catch (error) {
        throw error;
    }
}

// get single list by id
export const getListById = async (id: string) => {
    try {
        const list = await List.findById(id);

        if (!list) {
            const error = new Error("List not found");
            error.name = "notfounderror";
            throw error;
        }

        return list;
    } catch (error) {
        throw error;
    }
}