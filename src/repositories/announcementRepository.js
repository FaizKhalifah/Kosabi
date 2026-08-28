import Announcement from "../models/Announcement";
import BaseRepository from "./baseRepository";

export default class AnnouncementRepository extends BaseRepository{
    constructor() {
        super(Announcement);
    }
}