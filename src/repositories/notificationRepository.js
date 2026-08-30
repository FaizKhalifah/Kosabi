import Notification from "../models/Notification.js"
import BaseRepository from "./baseRepository.js"

export default class NotificationRepository extends BaseRepository{
    constructor(){
        super(Notification);
    }
}