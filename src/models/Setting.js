import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema({
    boardingHouse:{
        type:mongoose.Types.ObjectId,
        ref:"BoardingHouse",
        required:true
    },

    paymentDueDay:{
        type:String,
        required:true
    },

    lateFee:{
        type:String,
        required:true
    },

    currency:{
        type:String,
        required:true
    },

    allowVisitor:{
        type:String,
        required:true
    },

    maxVisitor:{
        type:String,
        required:true
    },

    automaticInvoice:{
        type:Boolean,
        required:true
    },

    waterFee:{
        type:String,
        required:true
    },

    electricFee:{
        type:String,
        requiredTrue
    },

    wifiFee:{
        type:String,
        requiredTrue
    }


}, {timestamps:true});

const Setting = mongoose.model("Setting", SettingSchema);
export default Setting;