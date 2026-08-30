import Maintenance from "../models/Maintenance.js";
import BaseRepository from "./baseRepository.js";

export default class MaintenanceRepository extends BaseRepository{
    constructor(){
        super(Maintenance);
    }
}