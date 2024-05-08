import mongoose from "mongoose";

const spInfoSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    sp_info:String,
})

const SpInfo = mongoose.model("SpInfo", spInfoSchema);
export default SpInfo