import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

const port = '3000';
const connection ='mongodb://localhost:27017/kosabi';
mongoose.connect(connection)
.then((result) => app.listen(port))
  .then(console.log(`server start on port ${port}`))
  .catch((err) => console.log(err));