import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        invoice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            required: true
        },

        amount: {
            type: Number,
            required: true,
            min: 1
        },

        paymentMethod: {
            type: String,
            enum: [
                "CASH",
                "BANK_TRANSFER",
                "E_WALLET",
                "OTHER"
            ],
            required: true
        },

        paymentDate: {
            type: Date,
            default: Date.now
        },

        proofImage: {
            type: String,
            default: null
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "VERIFIED",
                "REJECTED"
            ],
            default: "PENDING"
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        verifiedAt: {
            type: Date,
            default: null
        },

        rejectionReason: {
            type: String,
            trim: true,
            default: null
        },

        notes: {
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

PaymentSchema.index({
    invoice: 1
});

PaymentSchema.index({
    status: 1
});

PaymentSchema.index({
    paymentDate: -1
});

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;