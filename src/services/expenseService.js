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

  async createExpense(data, photos) {
    if (!data) {
      throw new ResponseError(
        401,
        "Diperlukan data untuk membuat expense baru",
      );
    }
    const { title, category, amount, expenseDate, description } = data;
    const photoPaths = photos ? photos.map((file) => file.path) : [];
    return await this.expenseRepository.create({
      title,
      category,
      amount,
      expenseDate,
      description,
      receiptImage: photoPaths,
    });
  }

  async updateExpense(id, data, photos) {
    if (!id) {
      throw new ResponseError(401, "Tidak ada ID");
    }

    const { title, category, amount, expenseDate, description } = data;
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new ResponseError(401, "data expense tidak ditemukan");
    }
    const photoPaths = photos ? photos.map((file) => file.path) : [];
    return await this.expenseRepository.update(id, {
      title,
      category,
      amount,
      expenseDate,
      description,
      receiptImage: photoPaths,
    });
  }
}

export default new ExpenseService();
