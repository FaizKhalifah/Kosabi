import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    action:{
        type:String,
        required:true
    },

    module:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    ipAddress:{
        type:String,
        required:true
    },

    userAgent:{
        type:String,
        required:true
    }

}, {timestamps:true});

const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);
export default ActivityLog;