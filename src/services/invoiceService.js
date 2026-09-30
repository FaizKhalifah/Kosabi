import InvoiceRepository from "../repositories/invoiceRepository.js";
import { ResponseError } from "../utils/errorsUtils.js";

class InvoiceService {
  constructor() {
    this.invoiceRepository = new InvoiceRepository();
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
}
