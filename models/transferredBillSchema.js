import mongoose from "mongoose";

const transferredBillSchema = new mongoose.Schema({
    bill_no:{
        ref:"BIll",
        type: mongoose.Schema.Types.bill_no
    },
    tr_date:Date, // date on which bill is transferred
    bill_Book:{
        ref:"BillBook",
        type: mongoose.Schema.Types.bill_book
    },
    KOT_book:{
        ref:"KOTBook",
        type: mongoose.Schema.Types.KOT_book
    },
    final_amount:Number,
})

const TransferredBill = mongoose.model("TransferredBill", transferredBillSchema);
export default TransferredBill