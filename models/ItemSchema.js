import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    item_no:{
        type: Number,
        required: true,
        unique: true
    },
    item_name:{
        type: String,
        required: true,
    },
    item_image:{
        type: String,
        required: true,
    },
    common_hall:{
        type:Number,
        default:0.00
    },
    ac_hall:{
        type:Number,
        default:0.00
    },
    parcel:{
        type:Number,
        default:0.00
    },
    rooms:{
        type:Number,
        default:0.00
    },
    swiggy:{
        type:Number,
        default:0.00
    },
    zomato:{
        type:Number,
        default:0.00
    },
    cgst_tax:{
        type:Number,
        default:5
    },
    sgst_tax:{
        type:Number,
        default:5
    },
    category_no:{
        type:Number,
        default:1
    },
    status:{
        type: Boolean,
        default: true
    }
})

const Item = mongoose.model("Item", itemSchema);

export default Item