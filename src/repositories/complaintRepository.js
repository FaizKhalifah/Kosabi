import Complaint from "../models/Complaint.js";
import BaseRepository from "./baseRepository.js";

export default class ComplaintRepository extends BaseRepository{
    constructor(){
        super(Complaint);
    }
}