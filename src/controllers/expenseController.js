import expenseService from "../services/expenseService.js";

export default class ExpenseController {
  async getAll(req, res) {
    try {
      const expenses = await expenseService.getAllExpense();
      res.status(201).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getbyId(req, res) {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      res.status(201).json(expense);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async create(req, res) {
    try {
      const createResult = await expenseService.createExpense(
        req.body,
        req.files,
      );
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const updateResult = await expenseService.updateExpense(
        req.params.id,
        req.body,
        req.files,
      );
      res.status(201).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleteResult = await expenseService.deleteExpense(req.params.id);
      res.status(201).json({ success: true, data: deleteResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const expenses = await expenseService.findByCategory(req.params.category);
      res.status(201).json({ success: true, data: expenses });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getByDate(req, res) {
    try {
      const expenses = await expenseService.findByDate(req.params.date);
      res.status(201).json({ success: true, data: expenses });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
