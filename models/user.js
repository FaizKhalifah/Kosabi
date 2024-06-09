import mongoose, {Schema} from "mongoose";
mongoose.connect('mongodb://localhost:27017/kosabi');

const userSchema = new Schema({
    nik:{
        type:String,
        required:true,
        unique:true
    },
    nama:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const user = mongoose.model('user',userSchema);
export default user;