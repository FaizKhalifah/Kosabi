import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
      }
});


userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model('User',userSchema);
export default User;