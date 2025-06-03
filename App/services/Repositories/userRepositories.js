const model = require("../../models");
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { fullName, username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password before saving
    return await User.create({ fullName, username, email, hashedPassword});
  }

  async authenticate(username, password) {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const user = await User.findOne({
      where: {
        username,
        password // Pastikan password sudah di-hash jika menggunakan hashing
      }
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return{ user, token };
}
}

module.exports = new userService();