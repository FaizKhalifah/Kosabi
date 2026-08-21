import { UUID } from "bson";
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    boardingHouse:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    roomNumber:{
        type:String,
        required:true
    },

    floor:{
        type:Number,
        min:1,
        required:true
    },

    type:{
        type:String,
            enum:[
            "STANDARD",
            "DELUXE",
            "VIP"
        ],
        required:true
    },

    price:{
        type:Number,
        min:0,
        required:true
    },

    deposit:{
        type:Number,
        required:true
    },

    capacity:{
        type:Number,
        required:true,
        min:1,
        default:1
    },

    status:{
        type:String,
        required:true,
        enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED'],
        default:'AVAILABLE'
    },

    size:{
        type:Number,
        required:true
    },

    facilities:[{
        type:String,
        trim:true
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