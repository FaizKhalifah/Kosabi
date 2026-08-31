import Visitor from "../models/Visitor.js";
import BaseRepository from "./baseRepository.js";

export default class VisitorRepository extends BaseRepository{
    constructor(){
        super(Visitor);
    }
}