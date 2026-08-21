import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rental",
            required: true
        },

        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true,
            min: 2000
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        lateFee: {
            type: Number,
            default: 0,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        paidAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "UNPAID",
                "PARTIAL",
                "PAID",
                "OVERDUE"
            ],
            default: "UNPAID"
        },

        notes: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

InvoiceSchema.index(
    {
        rental: 1,
        month: 1,
        year: 1
    },
    {
        unique: true
    }
);

InvoiceSchema.index({
    status: 1
});

InvoiceSchema.index({
    dueDate: 1
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;