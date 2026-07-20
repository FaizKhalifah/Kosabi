import mongoose from "mongoose";

const BoardingHouseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim:true
    },
    description: { 
        type: String
    },
    address: { 
        type: String
    },
    city: { 
        type: String
    },
    province: { 
        type: String
    },
    postalCode: { 
        type: String
    },
    email: { 
        type: String,
        unique: true,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },
    phone: { 
        type: String,
        unique: true,
        required: true,
        trim:true,
        unique:true
    },
    rules:{
        type:Array
    },
    facilities:{
        type:Array
    },
    photos:{
        type:Array
    },
    location:{
        type:String
    },
    checkInTime:{
        type: Date,
        default:null
    },
    checkOutTime:{
        type: Date,
        default:null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
},{timestamps:true});

const BoardingHouse = mongoose.model("BoardingHouse",BoardingHouseSchema);
export default BoardingHouse;