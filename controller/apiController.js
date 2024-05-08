import Item from "../models/ItemSchema.js";
import Category from "../models/categorySchema.js";
import ExistingCartItem from "../models/existingCartItemSchema.js";
import LocationInfo from "../models/locationInfoSchema.js";
import Location from "../models/locationSchema.js";

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

export const getLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations", error);
        next(error);
    }
}

export const getTables = async (req, res, next) => {
    try {
        const locations = await LocationInfo.find();
        if (locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations", error);
        next(error);
    }
}

export const getCartItems = async (req, res, next) => {
    try {
        const { tableNo, locationName } = req.body
        const cartItems = await ExistingCartItem.find({
            table_no: tableNo,
            location_name: locationName
        });
        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items", error);
        next(error);
    }
}


export const addNewItemToCart = async (req, res) => {
    const { item_no, table_no, location_name } = req.body;

    try {
        const existingItem = await ExistingCartItem.findOne({
            table_no,
            location_name,
            item_no
        });

        const newItemData = await Item.findOne({ item_no });
        if (!newItemData) {
            return res.status(404).json({ message: `Item not found with ID: ${item_no}` });
        }

        let price;
        switch (location_name) {
            case "Common-Hall":
                price = newItemData.common_hall;
                break;
            case "Ac-Hall":
                price = newItemData.ac_hall;
                break;
            case "Rooms":
                price = newItemData.rooms;
                break;
            case "Swiggy":
                price = newItemData.swiggy;
                break;
            case "Zomato":
                price = newItemData.zomato;
                break;
            case "Banquet":
                price = newItemData.common_hall;
                break;
            case "Parcel":
                price = newItemData.parcel;
                break;
            default:
                price = newItemData.common_hall;
        }

        if (existingItem) {
            if (!existingItem.is_printed) {
                existingItem.quantity += 1;
                await existingItem.save();
            } else {
                const cartItem = new ExistingCartItem({
                    table_no,
                    location_name,
                    item_no: newItemData.item_no,
                    item_name: newItemData.item_name,
                    item_image: newItemData.item_image,
                    quantity: 1,
                    price,
                });

                await cartItem.save();
            }
        } else {
            const cartItem = new ExistingCartItem({
                table_no,
                location_name,
                item_no: newItemData.item_no,
                item_name: newItemData.item_name,
                item_image: newItemData.item_image,
                quantity: 1,
                price,
            });

            await cartItem.save();
        }

        const updatedCartItems = await ExistingCartItem.find({
            table_no,
            location_name,
        });
        res.status(200).json({ success: true, message: "Item added to cart", updatedCartItems });
    } catch (error) {
        console.error("Error adding cart item:", error);
        res.status(500).json({ message: "Error adding cart item" });
    }
}

export const deleteItemFromCart = async (req, res) => {
    const { item_no, table_no, location_name } = req.body;
    try {
        const cartItem = await ExistingCartItem.findOne({
            item_no,
            table_no,
            location_name
        });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            await cartItem.deleteOne();
        }
        const updatedCartItems = await ExistingCartItem.find({
            table_no,
            location_name,
        });
        res.status(200).json({ success: true, message: 'Product quantity decremented', updatedCartItems });
    } catch (error) {
        console.error('Error decrementing product quantity:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({status : true});
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories", error);
        next(error);
    }
}