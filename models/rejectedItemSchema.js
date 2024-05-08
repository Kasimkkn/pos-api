import mongoose from "mongoose";

const rejectedItemSchema = new mongoose.Schema({
    transaction_no:Number,
    item_no:Number,
    item_name:String,
    quantity:Number,
    price:Number,
    total:Number,
    bill_book:Number,
    KOT_book:Number,
    KOT_no:Number,
    table_no:String,
    sub_table:String,
    location_no:Number,
    discount_perc:Number,
    is_active:{
        type: Boolean,
        default: false
    },
    date:Date,
    covers:Number,
    is_printed:{
        type: Boolean,
        default: false
    },
    sp_info:String,
    is_loading:{
        type: Boolean,
        default: false
    }

})

const RejectedItem = mongoose.model("RejectedItem", rejectedItemSchema);
export default RejectedItem