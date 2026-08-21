import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            enum: [
                "UTILITY",
                "MAINTENANCE",
                "SALARY",
                "PURCHASE",
                "OTHER"
            ],
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        expenseDate: {
            type: Date,
            required: true
        },

        receiptImage: {
            type: String,
            default: null
        },

        description: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);


ExpenseSchema.index({
    category: 1
});

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;