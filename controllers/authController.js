import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const maxAge = 60 * 60; // 1 hour
const createToken = (id) => {
    return jwt.sign({ id }, 'tokenRahasia', { expiresIn: maxAge });
};

async function register_get(req, res) {
    res.render('auth/register');
}

async function login_get(req, res) {
    res.render('auth/login');
}

async function register_post(req, res) {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: newUser._id });
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login_post(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw Error('incorrect username');
        }
        const auth = await user.comparePassword(password);
        if (!auth) {
            throw Error('incorrect password');
        }
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ 
            id: user._id,
            tipe:user.tipe
         });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function logout_get(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

export default {
    register_get,
    register_post,
    login_get,
    login_post,
    logout_get
};
