import Invoice from "../models/Invoice.js";
import BaseRepository from "./baseRepository.js";

export default class InvoiceRepository extends BaseRepository {
  constructor() {
    super(Invoice);
  }

  async getUnpaidInvoices() {
    return await Invoice.find({ status: "UNPAID" });
  }

  async getPaidInvoices() {
    return await Invoice.find({ status: "PAID" });
  }

  async getPartialInvoices() {
    return await Invoice.find({ status: "PARTIAL" });
  }

  async getOverDueInvoices() {
    return await Invoice.find({ status: "OVERDUE" });
  }
}
