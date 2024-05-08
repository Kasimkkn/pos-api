import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_no:{
        type: Number,
        required: true,
        unique: true
    },
    category_name:{
        type: String,
        required: true,
    },
    description:String,
    entry_date:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: Boolean,
        default: false
    }
})

const Category = mongoose.model("Category", categorySchema);
export default Category