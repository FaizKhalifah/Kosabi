import ActivityLog from "../models/ActivityLog.js";
import BaseRepository from "./baseRepository.js";

export default class ActivityLogRepository extends BaseRepository{
    constructor(){
        super(ActivityLog);
    }
}