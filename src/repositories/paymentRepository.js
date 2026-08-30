import Payment from "../models/Payment.js";
import BaseRepository from "./baseRepository.js";

export default class PaymentRepository extends BaseRepository{
    constructor(){
        super(Payment)
    }
}