import mongoose from "mongoose";

const transferredBillSchema = new mongoose.Schema({
    bill_no:{
        type: mongoose.Schema.ObjectId,
        ref:"Bill"
    },
    tr_date:Date, // date on which bill is transferred
    bill_Book:{
        type: mongoose.Schema.ObjectId,
        ref:"BillBook",
    },
    KOT_book:{
        type: mongoose.Schema.ObjectId,
        ref:"KOTBook",
    },
    final_amount:Number,
})

const TransferredBill = mongoose.model("TransferredBill", transferredBillSchema);
export default TransferredBill