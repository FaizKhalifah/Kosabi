import bodyParser, { json } from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

//routers
import authRouter from "./src/routes/authRoutes.js";
import boardingHouseRouter from "./src/routes/boardingHouseRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import roomRouter from "./src/routes/roomRoutes.js";

import { fileURLToPath } from "url";

//set project to read .env file
dotenv.config();

const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//use routers
app.use(authRouter);
app.use(boardingHouseRouter);
app.use(userRouter);
app.use(roomRouter);

app.get("/", (req, res) => {
  res.json({ message: "Halo ini adalah kosabi" });
});

const connection = process.env.MONGODB_URI;
mongoose
  .connect(connection)
  .then((result) => app.listen(port))
  .then(console.log(`server start on port ${port}`))
  .catch((err) => console.log(err));
