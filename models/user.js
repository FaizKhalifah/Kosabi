import mongoose, {Schema} from "mongoose";
mongoose.connect('mongodb://localhost:27017/kosabi');
import bcrypt from "bcrypt";

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
    },username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tipe:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

  

const User = mongoose.model('user',userSchema);
export default User;