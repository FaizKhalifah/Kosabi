import Expense from "../models/Expense.js";
import BaseRepository from "./baseRepository.js";

export default class ExpenseRepository extends BaseRepository {
  constructor() {
    super(Expense);
  }

  async findByCategory(category) {
    return this.model.find({ category: category });
  }

  async findByDate(date) {
    return this.model.find({ date: date });
  }
}
