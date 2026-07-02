import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { fileURLToPath } from "url";

//set project to read .env file
dotenv.config();

const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const connection = process.env.MONGODB_URI;
mongoose.connect(connection).then((result) => app.listen(port))
.then(console.log(`server start on port ${port}`))
.catch((err) => console.log(err));