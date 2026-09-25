import User from "../src/models/User.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await User.deleteMany({ name: "test" });
};

const createTestUser = async () => {
  await User.create({
    name: "test",
    email: "test@gmail.com",
    password: "testpassword",
  });
};

const getTestUser = async () => {
  await User.findOne({ name: "test" });
};

export default {
  removeTestUser,
  createTestUser,
  getTestUser,
};
