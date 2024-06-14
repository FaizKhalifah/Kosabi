import mongoose, {Schema} from "mongoose";
mongoose.connect('mongodb://localhost:27017/kosabi');

const roomSchema = new Schema({
    nomor_kamar:{
        type:Number,
        required:true,
        unique:true
    },
    harga:{
        type:Number,
        required:true
    },
    status: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    }]

})

const Room = mongoose.model('room',roomSchema);
export default Room;