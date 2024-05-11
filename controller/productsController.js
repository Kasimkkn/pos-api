import Item from "../models/ItemSchema.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await Item.find({ status: true });
        if (!products) {
            return res.status(400).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        next(error);
    }
}