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

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user',userSchema);
export default User;