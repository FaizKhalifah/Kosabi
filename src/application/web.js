import express from "express";
import authRouter from "../routes/authRoutes.js";
import boardingHouseRouter from "../routes/boardingHouseRoutes.js";
import roomRouter from "../routes/roomRoutes.js";
import userRouter from "../routes/userRoutes.js";
import expenseRouter from "../routes/expenseRoutes.js";
import bodyParser from "body-parser";
import rentalRouter from "../routes/rentalRoutes.js";

const web = express();

//utility
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(bodyParser.json());

//routes;
web.use(authRouter);
web.use(boardingHouseRouter);
web.use(roomRouter);
web.use(userRouter);
web.use(expenseRouter);
web.use(rentalRouter);

web.get("/", (req, res) => {
  res.json({ message: "Halo ini adalah kosabi" });
});

export default web;
