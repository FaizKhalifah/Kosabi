import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.connect('mongodb://localhost:27017/kosabi');

const userSchema = new Schema({
    nik: {
        type: String,
        required: true,
        unique: true
    },
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tipe: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
