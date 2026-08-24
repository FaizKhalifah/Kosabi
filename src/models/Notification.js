import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true,
        trim:true
    },

    type:{
        type:String,
        required:true
    },

    isRead:{
        type:Boolean,
        required:true
    }
}, {timestamps:true});

const Notification = mongoose.model("Notification",NotificationSchema);
export default Notification;