import mongoose from "mongoose";

const MaintenanceSchema = new mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required: true,
    },

    reportedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    status:{
        type:String,
        required:true
    },

    cost:{
        type:String,
        required:true
    },

    startDate:{
        type:Date,
        required:true
    },

    endDate:{
        type:Date,
        required:true
    }

}, {timestamps:true});

const Maintenance = mongoose.model("Maintenance",MaintenanceSchema);
export default Maintenance;