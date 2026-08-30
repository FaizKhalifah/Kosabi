import Invoice from "../models/Invoice.js";
import BaseRepository from "./baseRepository.js";

export default class InvoiceRepository extends BaseRepository{
    constructor(){
        super(Invoice);
    }
}