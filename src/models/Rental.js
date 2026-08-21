import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room",
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
        type:Number,
        min:0,
        required:true
    },
    deposit:{
        type:Number,
        min:0,
        required:true
    },
    billingDay:{
        type:Number,
        min:1,
        max:31
    },
    status:{
        type:String,
        enum:[
            "ACTIVE",
            "FINISHED",
            "CANCELLED"
        ],
        default:"ACTIVE"
    },
    notes:{
        type:String,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}, {timestamps:true});

RentalSchema.index({ tenant: 1 });
RentalSchema.index({ room: 1 });
RentalSchema.index({ status: 1 });
RentalSchema.index({ startDate: 1 });

const Rental = mongoose.model("Rental", RentalSchema);
export default Rental;