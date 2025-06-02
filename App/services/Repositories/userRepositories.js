const model = require("../../models");
const { Op } = require('sequelize');

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
    return await User.create({ fullName, username, email, password });
  }
}

module.exports = new userService();