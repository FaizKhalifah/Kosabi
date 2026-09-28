import express from "express";
import ExpenseController from "../controllers/expenseController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

const expenseController = new ExpenseController();
const expenseRouter = express.Router();
const baseUrl = "/expense";

expenseRouter.get(`${baseUrl}/`, expenseController.getAll);
expenseRouter.get(`${baseUrl}/:id`, expenseController.getbyId);
expenseRouter.get(`${baseUrl}/:category`, expenseController.getByCategory);
expenseRouter.get(`${baseUrl}/:date`, expenseController.getByDate);
expenseRouter.post(`${baseUrl}/`, expenseController.create);
expenseRouter.put(`${baseUrl}/:id`, expenseController.update);
expenseRouter.delete(`${baseUrl}/:id`, expenseController.delete);

export default expenseRouter;
