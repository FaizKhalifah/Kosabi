import dotenv from "dotenv";
import web from "./src/application/web.js";
import connectDatabase from "./src/config/database.js";

dotenv.config();

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDatabase();

    web.listen(port, () => {
      console.log(`server start on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
