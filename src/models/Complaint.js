import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
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

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    photos:{
        type:String
    },

    status:{
        type:String,
        enum:[
            "OPEN",
            "PROCESS",
            "RESOLVED",
            "CLOSED"
        ]
    },

    priority:{
        type:String,
        enum:[
            "LOW",
            "MEDIUM",
            "HIGH"
        ]
    },

    response:{
        type:String,
        required:true,
        trim:true
    },

    resolvedAt:{
        type:Date
    }

}, {timestamps:true});

const Complaint = mongoose.model("Complaint",ComplaintSchema);
export default ComplaintSchema;