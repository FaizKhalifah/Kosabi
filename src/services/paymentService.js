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

  async createPayment(data, photo) {
    if (!data) {
      throw new ResponseError(
        401,
        "Data diperlukan untuk membuat data pembayaran baru",
      );
    }
    const {
      invoiceId,
      paymentMethod,
      paymentDate,
      status,
      verifiedBy,
      verifiedAt,
      rejectionReason,
      notes,
    } = data;

    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice) {
      throw new Error(401, "Data invoice tidak ditemukan");
    }

    const photoPath = photo ? photo.path : [];

    const amount = invoice.amount;
    return await this.paymentRepository.create({
      invoiceId,
      paymentMethod,
      paymentDate,
      proofImage: photoPath,
      status,
      verifiedBy,
      verifiedAt,
      rejectionReason,
      notes,
    });
  }

  async updatePayment(id, data, photo) {
    if (!id) {
      throw new Error("Id is required to update payment");
    }

    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new ResponseError(401, "Data payment tidak ditemukan");
    }

    const updateData = {};

    const photoPath = photo ? photo.path : [];
    updateData["proofImage"] = photoPath;

    let invoice;

    if (data.invoiceId) {
      invoice = await this.invoiceRepository.findById(invoiceId);
      if (!invoice) {
        throw new Error(401, "Data invoice tidak ditemukan");
      }
      updateData["amount"] = invoice.amount;
    }

    const allowedFields = [
      "invoiceId",
      "paymentMethod",
      "paymentDate",
      "status",
      "verifiedBy",
      "verifiedAt",
      "rejectionReason",
      "notes",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    return await this.paymentRepository.update(id, updateData);
  }

  async deletePayment(id) {
    if (!id) {
      throw new ResponseError(401, "Id is needed to delete payment");
    }
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new ResponseError(401, "Payment not found");
    }
    return await this.paymentRepository.delete(id);
  }
}

export default new PaymentService();
