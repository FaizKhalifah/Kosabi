import { UUID } from "bson";
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    boardingHouse:{
        type:UUID,
        required: true,
    },

    roomNumber:{
        type:Number,
        required:true
    },

    floor:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    depocit:{
        type:Number,
        required:true
    },

    capacity:{
        type:Number,
        required:true,
        default:1
    },

    occupied:{
        type:Boolean,
        required:true,
        default:false
    },

    status:{
        type:String,
        required:true,
        enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'],
    },

    size:{
        type:Number,
        required:true
    },

    facilities:[{
        type:String
    }],

    photos:[{
        type:String
    }],

    description:{
        type:String,
        trim:true
    }

}, {timestamps:true});

const Room = mongoose.model("Room", RoomSchema);
export default Room;