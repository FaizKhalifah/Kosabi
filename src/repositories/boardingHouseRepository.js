import BoardingHouse from "../models/BoardingHouse.js";
import BaseRepository from "./baseRepository.js";

export default class BoardingHouseRepository extends BaseRepository{
    constructor(){
        super(BoardingHouse);
    }
}