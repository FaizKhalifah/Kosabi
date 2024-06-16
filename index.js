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


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views')); 

const port = '3000';
const connection ='mongodb://localhost:27017/kosabi';
mongoose.connect(connection)
  .then((result) => app.listen(port))
  .then(console.log(`server start on port ${port}`))
  .catch((err) => console.log(err));

app.get('/',(req,res)=>{
  res.render('index');
})
app.use(roomRouter);
app.use(authRouter);
