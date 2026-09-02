import User from "../models/User.js";
import BaseRepository from "./baseRepository.js";

export default class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }

    async findByName(name){
        return User.findOne({name});
    }

    async findByEmail(name){
        return User.findOne({email});
    }

}