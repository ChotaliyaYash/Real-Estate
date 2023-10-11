import { NextFunction, Request, Response } from "express";
import { ListModel, createList } from "../models/listModel";

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
        } = req.body;

        if (!name || !description || !address || !regularPrice || !discountedPrice || !bathrooms || !bedrooms || !furnished || !parking || !type || !offer || !imageUrls) {
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
            userRef: req.body.verifiedId,
        });

        res.status(201).json({
            success: true,
            data: list
        })
    } catch (error) {
        next(error);
    }
}
