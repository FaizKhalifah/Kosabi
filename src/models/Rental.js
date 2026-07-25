import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    startDate:{
        type:Date,
        required:true
    }
    ,
    endDate:{
        type:Date,
        required:true
    },
    monthlyPrice:{
        type:String,
        min:0,
        required:true
    },
    deposit:{
        type:String,
        min:0,
        required:true
    },
    billingDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:[
            "ACTIVE",
            "FINISHED",
            "CANCELLED"
        ],
    },
    notes:{
        type:String
    }

}, {timestamps:true});