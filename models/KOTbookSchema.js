import mongoose from "mongoose";

const kotBookSchema = new mongoose.Schema({
    KOT_book:{
        type: Number,
        unique: true,
        default: 0
    },
    is_active:{
        type: Boolean,
        default: false
    }
})

const KOTBook = mongoose.model("KOTBook", kotBookSchema);
export default KOTBook