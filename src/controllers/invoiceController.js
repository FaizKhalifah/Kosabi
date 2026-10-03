import InvoiceService from "../services/invoiceService.js";

export default class InvoiceController {
  async getAllInvoice(req, res) {
    try {
      const invoices = await InvoiceService.getAllInvoice();
      res.status(200).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getInvoiceById(req, res) {
    try {
      const invoice = await InvoiceService.getInvoiceById(req.params.id);
      res.status(200).json(invoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createInvoice(req, res) {
    try {
      const createResult = await InvoiceService.createInvoice(req.body);
      res.status(201).json({ success: true, data: createResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateInvoice(req, res) {
    try {
      const updateResult = await InvoiceService.updateInvoice(
        req.params.id,
        req.body,
      );
      res.status(201).json({ success: true, data: updateResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteInvoice(req, res) {
    try {
      const deleteResult = await InvoiceService.deleteInvoice(req.params.id);
      res.status(201).json({ success: true, data: deleteResult });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getUnpaidInvoices(req, res) {
    try {
      const invoices = await InvoiceService.getUnpaidInvoices();
      res.status(201).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPaidInvoices(req, res) {
    try {
      const invoices = await InvoiceService.getPaidInvoices();
      res.status(201).json(invoice);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getPartialInvoices(req, res) {
    try {
      const invoices = await InvoiceService.getPartialInvoices();
      res.status(201).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getOverdueInvoices(req, res) {
    try {
      const invoices = await InvoiceService.getOverDueInvoices();
      res.status(201).json(invoices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
