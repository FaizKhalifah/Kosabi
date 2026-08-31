import Setting from "../models/Setting.js";
import BaseRepository from "./baseRepository.js";

export default class SettingRepository extends BaseRepository{
    constructor(){
        super(Setting);
    }
}