import InvoiceRepository from "../repositories/invoiceRepository.js";
import RentalRepository from "../repositories/rentalRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";
import calculateDueDate from "../utils/dateUtils.js";
import calculateStatus from "../utils/dateUtils.js";

class InvoiceService {
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
    this.rentalRepository = new RentalRepository();
  }

  async getAllInvoice() {
    const invoices = await this.invoiceRepository.findAll();
    if (!invoices || invoices.length == 0) {
      return {
        message: "Belum ada data invoice",
      };
    }
    return {
      invoices: invoices,
    };
  }

  async getInvoiceById(id) {
    if (!id) {
      throw new ResponseError(401, "Diperlukan id untuk mencari invoice");
    }
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new ResponseError(401, "ID tidak ditemukan");
    }
    return {
      invoice: invoice,
    };
  }

  async createInvoice(data) {
    if (!data) {
      throw new ResponseError(401, "Data needed to create new invoice");
    }
    const { rentalId, invoiceNumber, month, year, lateFee, paidAmount, notes } =
      data;
    const rental = await this.rentalRepository.findById(rentalId);
    if (!rental) {
      throw new ResponseError(401, "Data tidak ditemukan");
    }

    const amount = rental.monthlyPrice;
    const totalAmount = amount + lateFee;
    const dueDate = calculateDueDate(
      year,
      month,
      rental.billingDay,
      rental.endDate,
    );

    if (paidAmount > totalAmount) {
      throw new ResponseError(
        400,
        "Pembayaran tidak boleh melebihi total tagihan",
      );
    }

    const status = calculateStatus(paidAmount, totalAmount, dueDate);

    return await this.invoiceRepository.create({
      rental: rentalId,
      invoiceNumber,
      month,
      year,
      amount,
      lateFee,
      totalAmount,
      paidAmount,
      dueDate,
      status,
      notes,
    });
  }

  async updateInvoice(id, data) {
    if (!id) {
      throw new ResponseError(
        401,
        "Id diperlukan untuk memperbarui data invoice",
      );
    }

    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new ResponseError(401, "Invoice tidak ditemukan");
    }

    const updateData = {};
    let rental;
    if (data.rentalId) {
      rental = await this.rentalRepository.findById(data.rentalId);
      if (!rental) {
        throw new ResponseError(401, "Data rental tidak ditemukan");
      }
    }
    const allowedFields = ["invoiceNumber", "lateFee", "paidAmount", "notes"];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    const newLateFee =
      data.lateFee !== undefined ? data.lateFee : invoice.lateFee;

    const newPaidAmount =
      data.paidAmount !== undefined ? data.paidAmount : invoice.paidAmount;

    const totalAmount = invoice.amount + newLateFee;

    if (newPaidAmount > totalAmount) {
      throw new ResponseError(
        400,
        "Pembayaran tidak boleh melebihi total tagihan",
      );
    }

    const status = this.calculateStatus(
      newPaidAmount,
      totalAmount,
      invoice.dueDate,
    );

    updateData.lateFee = newLateFee;
    updateData.paidAmount = newPaidAmount;
    updateData.totalAmount = totalAmount;
    updateData.status = status;

    return await this.invoiceRepository.update(id, updateData);
  }

  async deleteInvoice(id) {
    if (!id) {
      throw new ResponseError(401, "Diperlukan id untuk menghapus invoice");
    }
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new ResponseError(401, "Data invoice tidak ditemukan");
    }
    return await this.invoiceRepository.delete(id);
  }

  async getUnpaidInvoices() {
    const invoices = await this.invoiceRepository.getUnpaid();
    if (!invoices || invoices.length == 0) {
      return {
        message: "Belum ada invoice yang belum dibayar",
      };
    }
    return {
      invoices: invoices,
    };
  }

  async getPaidInvoices() {
    const invoices = await this.invoiceRepository.getPaid();
    if (!invoices || invoices.length == 0) {
      return {
        message: "Belum ada invoice yang dibayar",
      };
    }
    return {
      invoices: invoices,
    };
  }

  async getPartialInvoices() {
    const invoices = await this.invoiceRepository.getPartial();
    if (!invoices || invoices.length == 0) {
      return {
        message: "Belum ada invoice yang dibayar sebagian",
      };
    }
    return {
      invoices: invoices,
    };
  }

  async getOverDueInvoices() {
    const invoices = await this.invoiceRepository.getOverDue();
    if (!invoices || invoices.length == 0) {
      return {
        message: "Belum ada invoice yang telah dibayar",
      };
    }
    return {
      invoices: invoices,
    };
  }
}

export default new InvoiceService();
