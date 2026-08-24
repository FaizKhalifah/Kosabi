import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    visitorName:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true
    },

    visitDate:{
        type:Date,
        required:true
    },

    checkIn:{
        type:String,
        required:true
    },

    checkOut:{
        type:String,
        required:true
    },

    notes:{
        type:String,
        trim:true
    }

}, {timestamps:true});

const Visitor = mongoose.model("Visitor",VisitorSchema);
export default Visitor;