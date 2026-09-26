import mongoose from "mongoose";

const connectDatabase = async () => {
  const connection = process.env.MONGODB_URI;

  await mongoose.connect(connection);

  console.log("MongoDB connected");
};

export default connectDatabase;
