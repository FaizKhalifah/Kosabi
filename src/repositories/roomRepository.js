import Room from "../models/Room.js";
import BaseRepository from "./baseRepository.js";

export default class RoomRepository extends BaseRepository{
    constructor(){
        super(Room);
    }
}