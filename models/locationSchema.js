import mongoose from "mongoose";

const locationShcema = new mongoose.Schema({
    location_no:{
        type: Number,
        required: true,
        unique: true
    },
    location_name:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: false
    }
})

const Location = mongoose.model("Location", locationShcema);
export default Location
