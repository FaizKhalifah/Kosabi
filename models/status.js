import mongoose, { Schema } from "mongoose";

mongoose.connect('mongodb://localhost:27017/kosabi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const statusSchema = new Schema({
    id_status: {
        type: String,
        required: true,
        unique: true
    },
    nik: {
        type: String,
        required: true,
        ref: 'User'
    },
    nomor_kamar: {
        type: String,
        required: true,
        ref: 'Room'
    },
    status: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    }
});

const Status = mongoose.model('Status', statusSchema);
export default Status;
