import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:[
            "UTILITY",
            "MAINTENANCE",
            "SALARY",
            "PURCHASE",
            "OTHER"
        ],
        required:true
    },
    amount:{
        type:String,
        required:true
    },

    expenseDate:{
        type:Date,
        required:true
    },

    receiptImage:{
        type:String
    },

    description:{
        type:String
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {timestamps:true})

const Expense = mongoose.model("Expense",ExpenseSchema);
export default Expense;