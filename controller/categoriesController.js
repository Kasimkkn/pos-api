import Category from "../models/categorySchema.js";

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

export const addCategory = async (req, res, next) => {
    try {
        const maxCategory = await Category.findOne({}, { category_no: 1 }).sort({ category_no: -1 });
        let maxCategoryNo = 0;
        if (maxCategory) {
            maxCategoryNo = maxCategory.category_no;
        }
        const category_no = maxCategoryNo + 1;
        const { category_name, status , description } = req.body;

        const newCategory = new Category({
            category_no,
            category_name,
            description,
            entry_date: Date.now(),
            status
        });
        await newCategory.save();
        res.status(201).json({ message: "Category added successfully" });
    } catch (error) {
        console.error("Error adding category", error);
        next(error);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const { category_no, category_name, status , description } = req.body;
        const existingCategory = await Category.findOne({ category_no });
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        existingCategory.category_name = category_name;
        existingCategory.description = description;
        existingCategory.status = status;
        await existingCategory.save();
        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category", error);
        next(error);
    }
}