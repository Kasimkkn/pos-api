import mongoose from "mongoose";

const billInfoSchema = new mongoose.Schema({
    bill_footer:String,
    tin_no:String,
    ST_no:String,
    LIC_no:String,
    customer_id:Number,
    customer_mobile:String,
    customer_name:String,
    resturant_name:String,
})

const BillInfo = mongoose.model("BillInfo", billInfoSchema);
export default BillInfo