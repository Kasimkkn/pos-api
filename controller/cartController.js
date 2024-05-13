import ExistingCartItem from "../models/existingCartItemSchema.js";

export const getCartItems = async (req, res, next) => {
    try {
        const { tableNo, locationName } = req.body
        const cartItems = await ExistingCartItem.find({
            table_no: tableNo,
            location_name: locationName
        });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" + error });
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

        res.status(500).json({ message: "Internal server error" + error });
        next(error);
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
        res.status(500).json({ message: "Internal server error" + error });
        next(error);
    }
}

export const addQtyAndSpInfo = async (req, res) => {
    try {
        const { table_no, location_name, item_no, new_quantity, sp_info } = req.body
        let existingCartItem = await ExistingCartItem.findOne({
            table_no,
            location_name,
            item_no
        });
        if(!existingCartItem){
            return res.status(404).json({ message: `Item not found with ID: ${item_no}` });
        }
        const newItemData = await Item.findOne({ item_no });
        if (!newItemData) {
            return res.status(404).json({ message: `Item not found with ID: ${item_no}` });
        }
        let price;
        if (location_name == "Common-Hall") {
            price = newItemData.common_hall;
        }
        if (location_name == "Ac-Hall") {
            price = newItemData.ac_hall;
        }
        if (location_name == "Rooms") {
            price = newItemData.rooms;
        }
        if (location_name == "Swiggy") {
            price = newItemData.swiggy;
        }
        if (location_name == "Zomato") {
            price = newItemData.zomato;
        }
        if (location_name == "Banquet") {
            price = newItemData.common_hall;
        }
        if (location_name == "Parcel") {
            price = newItemData.parcel;
        }
        if (location_name == "Home-delivery (nearBy)") {
            price = newItemData.swiggy;
        }

        if (existingCartItem) {
            if (existingCartItem.is_printed !== true) {
                existingCartItem.quantity += new_quantity;
                existingCartItem.sp_info = sp_info;
                await existingCartItem.save();
                const updatedCartItems = await ExistingCartItem.find({
                    table_no,
                    location_name,
                })
                return res.status(200).json({ success: true, message: "Item added to cart", updatedCartItems });
            }
            else {
                const newCartItem = new ExistingCartItem({
                    table_no,
                    location_name,
                    item_no,
                    item_name: newItemData.item_name,
                    item_image: newItemData.item_image,
                    quantity: new_quantity,
                    price,
                    sp_info,
                    is_printed: false
                });
                await newCartItem.save();
                const updatedCartItems = await ExistingCartItem.find({
                    table_no,
                    location_name,
                })
                return res.status(200).json({ success: true, message: "Item added to cart", updatedCartItems });
            }
        }
        else {
            const cartItem = new ExistingCartItem({
                table_no,
                location_name,
                item_no,
                item_name: newItemData.item_name,
                item_image: newItemData.item_image,
                price,
                quantity,
                sp_info,
                is_printed: false
            });
            await cartItem.save();
        }
        const updatedCartItems = await ExistingCartItem.find({
            table_no,
            location_name,
        });

        return res.status(200).json({ success: true, message: "Item added to cart", updatedCartItems });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" + error });
        next(error);
    }
}