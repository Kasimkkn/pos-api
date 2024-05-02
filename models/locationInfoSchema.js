import mongoose from "mongoose";

const locationInfoSchema = new mongoose.Schema({
    serial_no:String,
    location_no:Number,
    table_no:String,
    status:{
        type: Boolean,
        default: false
    }
})

const LocationInfo = mongoose.model("LocationInfo", locationInfoSchema);
export default LocationInfo