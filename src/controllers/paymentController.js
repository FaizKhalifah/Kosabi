import paymentService from "../services/paymentService.js";

export default class PaymentController {
  async getAllPayments(req, res) {
    try {
      const payments = await paymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createPayment(req, res) {
    try {
      const createResult = await paymentService.createPayment(
        req.body,
        req.files,
      );
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updatePayment(req, res) {
    try {
      const updateResult = await paymentService.updatePayment(
        req.params.id,
        req.body,
        req.files,
      );
      res.status(200).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deletePayment(req, res) {
    try {
      const deleteResult = await paymentService.deletePayment(req.params.id);
      res.status(204).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
