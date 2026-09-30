import ExpenseRepository from "../repositories/expenseRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";

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
    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new ResponseError(401, "data expense tidak ditemukan");
    }

    const allowedFields = [
      "title",
      "category",
      "amount",
      "expenseDate",
      "description",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }
    if (photos && photos.length > 0) {
      updateData.receiptImage = photos.map((file) => file.path);
    }
    return await this.expenseRepository.update(id, updateData);
  }

  async deleteExpense(id) {
    if (!id) {
      throw new ResponseError(401, "Tidak ada ID");
    }

    const expense = await this.expenseRepository.findById(id);
    if (!expense) {
      throw new ResponseError(401, "Data expense tidak ditemukan");
    }
    await this.expenseRepository.delete(id);
    return {
      message: "expense has been deleted",
    };
  }

  async findByCategory(category) {
    if (!category) {
      throw new ResponseError(401, "Data kategori tidak ditemukan");
    }
    const expenses = await this.expenseRepository.findByCategory(category);
    if (!expenses || expenses.length == 0) {
      return {
        message: "Belum ada pengeluaran di kategori tersebut",
      };
    }
    return {
      expenses: expenses,
    };
  }

  async findByDate(date) {
    if (!date) {
      throw new ResponseError(401, "Data tanggal tidak ditemukan");
    }
    const expenses = await this.expenseRepository.findByDate(date);
    if (!expenses || expenses.length == 0) {
      return {
        message: "Belum ada pengeluaran di tanggal tersebut",
      };
    }
    return {
      expenses: expenses,
    };
  }
}

export default new ExpenseService();
