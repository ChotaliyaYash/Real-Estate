import { NextFunction, Request, Response } from "express";
import { createList, getLists, getUserSpecificList, deleteList, updateList, getListById } from "../models/listModel";
import { get } from "mongoose";

// add list
export const addList = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {
            name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            verifiedId
        } = req.body;


        if (!name || !description || !address || !regularPrice || !discountedPrice || !bathrooms || !bedrooms || !type || !imageUrls) {
            const error = new Error("Please fill all the fields");
            error.name = "validationerror";
            throw error;
        }

        const list = await createList({
            name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            userRef: verifiedId,
        });

        res.status(201).json({
            success: true,
            message: "List created successfully",
            data: list
        })
    } catch (error) {
        next(error);
    }
}

// get all products
export const getAllList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await getLists();

        res.status(200).json({
            success: true,
            message: "List fetched successfully",
            data: list,
        })
    } catch (error) {
        next(error);
    }
}

// get user specific list by id
export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verifiedId } = req.body;
        const list = await getUserSpecificList(verifiedId);

        res.status(200).json({
            success: true,
            message: "List fetched successfully",
            data: list,
        })
    } catch (error) {
        next(error);
    }
}

// delete list by id
export const deleteListById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verifiedId } = req.body;
        const { id } = req.params;

        const list = await deleteList(id, verifiedId);

        res.status(200).json({
            success: true,
            message: "List deleted successfully",
            data: list
        })
    } catch (error) {
        next(error);
    }
}

// update list by id
export const updateListById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { verifiedId } = req.body;
        const { id } = req.params;
        const {
            name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            userRef,
        } = req.body;

        const list = await updateList(id, verifiedId, {
            name,
            description,
            address,
            regularPrice,
            discountedPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            type,
            offer,
            imageUrls,
            userRef,
        });

        res.status(200).json({
            success: true,
            message: "List updated successfully",
            data: list,
        })
    } catch (error) {
        next(error);
    }
}

export const getAListById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const list = await getListById(id);

        res.status(200).json({
            success: true,
            message: "List fetched successfully",
            data: list,
        })
    } catch (error) {
        next(error);
    }
}