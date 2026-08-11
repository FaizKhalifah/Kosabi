import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    invoice:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
    },

    amount:{
        type:Number,
        required:true,
        default:0
    },

    paymentMethod:{
        type:String,
        required:true
    },

    paymentDate:{
        type:Date,
        required:true
    },

    proofImage:{
        type:string,
        required:true
    },

    status:{
        type:String,
        enum:[
            "PENDING",
            "VERIFIED",
            "REJECTED"
        ],
        default:"PENDING"
    },

    verifiedBy:{
        type:String,
        required:true
    },

    verifiedAt:{
        type:String,
        required:true
    },

    notes:{
        type:SVGAElementtring
    }
}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;