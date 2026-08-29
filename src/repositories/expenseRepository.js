import Expense from "../models/Expense.js";
import BaseRepository from "./baseRepository.js";

export default class ExpenseRepository extends BaseRepository{
    constructor(){
        super(Expense);
    }
}