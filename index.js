import express from "express";
import roomRouter from "./routes/roomRoutes.js";  
import authRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";  
import path from "path";   
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();    

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

const connection ='mongodb://localhost:27017/kosabi';
mongoose.connect(connection)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(roomRouter);
app.use(authRouter);
console.log("hello");
