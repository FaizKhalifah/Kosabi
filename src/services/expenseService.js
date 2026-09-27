import ExpenseRepository from "../repositories/expenseRepository";
import { ResponseError } from "../utils/errorsUtils";

class ExpenseService {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  async getAllExpense() {
    const expenses = await this.expenseRepository.findAll();
    if (!expenses || expenses.length == 0) {
      return {
        message: "Beluma ada data pengeluaran",
      };
    }
    return {
      expenses: expenses,
    };
  }

  async getExpenseById(id) {
    if (!id) {
      throw new ResponseError(401, "Tidak ada ID");
    }

    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new ResponseError(401, "Data pengeluaran tidak ditemukan");
    }
    return {
      expense: expense,
    };
  }
}

export default new ExpenseService();
