import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    expense_no:{
        type: Number,
        required: true,
        unique: true
    },
    expense_name:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true
    },
    createdAt:Date
})

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense

