import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
    cgst_tax:Number,
    sgst_tax:Number
})

const Tax = mongoose.model("Tax", taxSchema);
export default Tax