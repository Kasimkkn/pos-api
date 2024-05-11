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
};

export const addProducts = async (req, res, next) => {
  try {
    const {
      item_name,
      item_image,
      common_hall,
      ac_hall,
      parcel,
      rooms,
      swiggy,
      zomato,
      cgst_tax,
      sgst_tax,
      status,
      category_no,
    } = req.body;

    if(!item_name || !item_image || !common_hall || !ac_hall || !parcel || !rooms || !swiggy || !zomato || !cgst_tax || !sgst_tax || !status || !category_no){
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const maxItem = await Item.findOne({}, { item_no: 1 }).sort({
        item_no: -1,
      });
  
      let maxItemNo = 0;
      if (maxItem) {
        maxItemNo = maxItem.item_no;
      }
      const newItemNo = maxItemNo + 1;

    const newProduct = await Item.create({
      item_no: newItemNo,
      item_name,
      item_image,
      common_hall,
      ac_hall,
      parcel,
      rooms,
      swiggy,
      zomato,
      cgst_tax,
      sgst_tax,
      status,
      category_no,
    });

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });    
  } catch (error) {
    console.error("Error Adding products", error);
    next(error);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const {
      item_no,
      item_name,
      item_image,
      common_hall,
      ac_hall,
      parcel,
      rooms,
      swiggy,
      zomato,
      cgst_tax,
      sgst_tax,
      status,
      category_no,
    } = req.body;
    
    const updatedProduct = await Item.findOneAndUpdate(
      { item_no },
      {
        item_name,
        item_image,
        common_hall,
        ac_hall,
        parcel,
        rooms,
        swiggy,
        zomato,
        cgst_tax,
        sgst_tax,
        status,
        category_no,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    })
  } catch (error) {
    console.error("Error updating products", error);
    next(error);
  }
}