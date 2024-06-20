import express from "express";
import roomRouter from "./routes/roomRoutes.js";  
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import mongoose from "mongoose";  
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";
import Room from "./models/room.js";
import path from "path";   
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();    

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views')); 

const port = '3000';
const connection ='mongodb://localhost:27017/kosabi';
mongoose.connect(connection)
  .then((result) => app.listen(port))
  .then(console.log(`server start on port ${port}`))
  .catch((err) => console.log(err));

app.get('*',authMiddleware.checkUser)
app.get('/',(req,res)=>{
  res.render('index', async (request, response) => {
    try {
        const rooms = await Room.find();
        response.render('rooms', { rooms });
    } catch (err) {
        console.log(err);
    }
});
})

app.use(adminRouter);
app.use(authRouter);
app.use(roomRouter);
app.use('/rooms', authMiddleware.requireAuth, roomRouter);