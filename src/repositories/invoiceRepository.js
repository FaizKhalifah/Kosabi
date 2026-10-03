import Invoice from "../models/Invoice.js";
import BaseRepository from "./baseRepository.js";

export default class InvoiceRepository extends BaseRepository {
  constructor() {
    super(Invoice);
  }

  async getUnpaid() {
    return await Invoice.find({ status: "UNPAID" });
  }

  async getPaid() {
    return await Invoice.find({ status: "PAID" });
  }

  async getPartial() {
    return await Invoice.find({ status: "PARTIAL" });
  }

  async getOverDue() {
    return await Invoice.find({ status: "OVERDUE" });
  }
}
