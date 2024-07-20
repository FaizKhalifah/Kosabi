import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },

})

const Order = mongoose.model('Order',orderSchema);
export default Order;