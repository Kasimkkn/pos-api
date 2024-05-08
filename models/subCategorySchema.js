import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    sub_category_no:{
        type: Number,
        required: true,
        unique: true
    },
    sub_category_name:{
        type: String,
        required: true,
    },
    entry_date:Date,
    parents_sub_category_no:Number,
    status:{
        type: Boolean,
        default: false
    },
    description:String,
    category_no:Number
})


const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory