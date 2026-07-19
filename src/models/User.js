import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true,
        trim:true
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

    password: {
        type: String,
        required: true,
        select:false,
        minLength:8
    },

    role: {
        type: String,
        enum: ['ADMIN', 'TENANT'],
        default: 'TENANT'
    },

    isActive: {
        type: boolean
    },

    lastLogin: {
        type: Date,
        default:null
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps:true});

const User = mongoose.model('User',UserSchema);
export default User;