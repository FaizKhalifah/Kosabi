import InvoiceRepository from "../repositories/invoiceRepository.js";
import PaymentRepository from "../repositories/paymentRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";

class PaymentService {
  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.invoiceRepository = new InvoiceRepository();
  }

  async getAllPayments() {
    const payments = await this.paymentRepository.findAll();
    if (!payments || payments.length == 0) {
      return {
        message: "Belum ada data pembayaran",
      };
    }
    return {
      payments: payments,
    };
  }

  async getPaymentById(id) {
    if (!id) {
      throw new ResponseError(
        401,
        "Dibutuhkan ID untuk mencari data pembayaran",
      );
    }
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new ResponseError(401, "Data pembayaran tidak ditemukan");
    }
    return {
      payment: payment,
    };
  }
}

export default new PaymentService();
