import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const UserSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true 
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

     role: {
        type: String,
        enum: ['admin', 'tuser'],
        default:'admin',
        required: true
    },

    isActive: {
        type: boolean
    },

    lastLogin: {
        type: Date,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }

});

const User = mongoose.model('User',UserSchema);
export default User;