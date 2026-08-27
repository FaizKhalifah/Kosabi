import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
    {
        boardingHouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BoardingHouse",
            required: true,
            unique: true
        },

        paymentDueDay: {
            type: Number,
            min: 1,
            max: 31,
            default: 5
        },

        lateFee: {
            type: Number,
            min: 0,
            default: 0
        },

        currency: {
            type: String,
            default: "IDR",
            trim: true
        },

        allowVisitor: {
            type: Boolean,
            default: true
        },

        maxVisitor: {
            type: Number,
            min: 0,
            default: 1
        },

        automaticInvoice: {
            type: Boolean,
            default: true
        },

        waterFee: {
            type: Number,
            min: 0,
            default: 0
        },

        electricFee: {
            type: Number,
            min: 0,
            default: 0
        },

        wifiFee: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Setting = mongoose.model("Setting", SettingSchema);

export default Setting;