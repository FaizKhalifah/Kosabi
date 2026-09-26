import User from "../src/models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const removeTestUser = async () => {
  console.log("MongoDB readyState:", mongoose.connection.readyState);
  await User.deleteMany();
};

export const createTestUser = async () => {
  await User.create({
    name: "test",
    email: "test@gmail.com",
    password: "testpassword",
  });
};

export const getTestUser = async () => {
  return await User.findOne({ name: "test" });
};
