import mongoose, {Schema} from "mongoose";
mongoose.connect('mongodb://localhost:27017/kosabi'); 

const paymentSchema = new Schema({
    id_pembayaran : {  
        type:String,
        required: true, 
        unique: true
    }, 
    id_user:{
        type: String,      
        required: true, 
        ref: 'User'
    },nomor_kamar:{
        type: String, 
        required: true,  
        ref: 'Room' 
    },nominal:{
        type: Number, 
        required: true
    },tanggal:{
        type: Date, 
        required: true 
    }
})    

const payment = mongoose.model('payment',paymentSchema);
export default payment;