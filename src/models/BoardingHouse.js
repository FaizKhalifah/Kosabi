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
        type: String,
        trim:true
    },

    city: { 
        type: String,
        trim:true
    },

    province: { 
        type: String,
        trim:true
    },

    postalCode: { 
        type: String,
        trim:true
    },

    email: { 
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },

    phone: { 
        type: String,
        required: true,
        trim:true,
        unique:true
    },

    rules: [{
        type: String,
        trim: true
    }],

    facilities:[{
        type:String
    }],

    photos:[{
        type:String
    }],

    location:{
        latitude:Number,
        longitude:Number
    },

    checkInTime:{
        type: Date,
        default:null
    },

    checkOutTime:{
        type: Date,
        default:null
    },

    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},{timestamps:true});

const BoardingHouse = mongoose.model("BoardingHouse",BoardingHouseSchema);
export default BoardingHouse;