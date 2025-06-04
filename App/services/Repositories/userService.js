const model = require("../../models");
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../../models/user");

const User = model.User;
class userService {
  async getAll() {
    return await User.findAll();
  }
  
  async getById(id) {
    if (!id) {
      throw new Error("User ID is required");
    }

    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async create(data) {
    console.log("Creating user with data:", data);
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: data.email },
          { username: data.username }
        ]
      }
    });
    if (existingUser) {
      throw new Error("Email or username already exists");
    }
    const { username, email, password } = data;
    console.log("password:", password)
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    console.log("hashedPassword:", hashedPassword)
    return await User.create({username, email, password:hashedPassword});
  }

  async authenticate(username, password) {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password for comparison
    const user = await User.findOne({
      where: {
        [Op.or]:[
          {username: username},
          {password: hashedPassword} // Pastikan password sudah di-hash jika menggunakan hashing
        ]// Pastikan password sudah di-hash jika menggunakan hashing
      }
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error("Invalid password");
    }

    console.log("compare password berhasil")

    const token = jwt.sign({ id: user.id }, "koderahasia", { expiresIn: '1h' });
    console.log("token berhasil dibuat");
    return{ user, token };
}
}

module.exports = new userService();