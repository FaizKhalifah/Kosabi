import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    rental:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Rental",
        required: true,
    },

    invoiceNumber:{
        type:Number,
        required:true
    },

    month:{
        type:String,
        required:true
    },

    year:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    dueDate:{
        type:Date,
        required:true
    },

    status:{
        type:String,
        enum:[
            "unpaid",
            "partial",
            "paid",
            "overdue"
        ],
        default:"unpaid"
    },

    lateFee:{
        type:Number,
        required:true
    },

    notes:{
        type:String,
        trim:true
    }



}, {timestamps:true})