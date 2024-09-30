import mongoose  from "mongoose";
import Product from "../models/product.model.js";

/**
 * Gets all products
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export const getPro = async (req, res) => {
    try {
        const pro = await Product.find({});
        res.status(200).json({
            success: true,
            data: pro
        })
    } catch (error) {
        console.error("Error in get product: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * Creates a new product
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const createPro = async (req, res) => {
    const pro = req.body;

    if(!print.name || !pro.price || !pro.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }

    const newPro = new Product(pro);

    try {
        await newPro.save();
        res.status(201).json({
           success: true,
           data: newPro
        })
    } catch (error) {
        console.error("Error in create product: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * Updates an existing product
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const updatePro = async (req, res) => {
    const {id} = req.params;
    const pro = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid product id"
        })
    }

    try {
        const updatedPro = await Product.findByIdAndUpdate(id, pro, {new: true})
        res.status(200).json({
            success: true,
            data: updatedPro
        })
    } catch (error) {
        console.error("Error in update product: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * Deletes an existing product
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const deletePro = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid product id"
        })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.error("Error in delete product: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}