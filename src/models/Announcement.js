import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    content:{
        type:String,
        required:true,
        trim:true
    },

    attachments:{
        type:Array,
    },

    publishedDate:{
        type:Date,
        required:true
    },

    expiredAt:{
        type:Date,
        required:true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


}, {timestamps:true});

const Announcement = mongoose.model("Announcment",AnnouncementSchema);
export default Announcement;