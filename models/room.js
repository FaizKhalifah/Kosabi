import mongoose from "mongoose";
import { Schema } from "mongoose";

const roomSchema = new Schema({
    nomor_kamar: {
        type: Number,
        required: true,
        unique: true,
      },
      harga: {
        type: Number,
        required: true,
      },
});   

const Room = mongoose.model('room');
export default Room;