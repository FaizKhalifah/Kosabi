import express from "express";
import InvoiceController from "../controllers/invoiceController.js";

const invoiceController = new InvoiceController();
const invoiceRouter = express.Router();
const baseUrl = "/invoice";

invoiceRouter.get(`${baseUrl}/`, invoiceController.getAllInvoice);
invoiceRouter.get(`${baseUrl}/:id`, invoiceController.getInvoiceById);
invoiceRouter.post(`${baseUrl}/`, invoiceController.createInvoice);
invoiceRouter.patch(`${baseUrl}/:id`, invoiceController.updateInvoice);
invoiceRouter.delete(`${baseUrl}/:id`, invoiceController.deleteInvoice);

export default invoiceRouter;
