import InvoiceRepository from "../repositories/invoiceRepository.js";
import RentalRepository from "../repositories/rentalRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";

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
    const {
      rentalId,
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
    } = data;
    const rental = await this.rentalRepository.findById(rentalId);
    if (!rental) {
      throw new ResponseError(401, "Data tidak ditemukan");
    }
    if (dueDate > rental.endDate) {
      throw new ResponseError(
        401,
        "Tenggat pembayaran tidak boleh melebihi masa akhir sewa",
      );
    }

    if (paidAmount > totalAmount) {
      throw new ResponseError(401, "Pembayaran tidak boleh melebihi tagihan");
    }
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
    const allowedFields = [
      "rentalId",
      "invoiceNumber",
      "month",
      "year",
      "amount",
      "lateFee",
      "totalAmount",
      "paidAmount",
      "dueDate",
      "status",
      "notes",
    ];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

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
}

export default new InvoiceService();
