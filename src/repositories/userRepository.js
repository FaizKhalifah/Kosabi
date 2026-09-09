import User from "../models/User.js";
import BaseRepository from "./baseRepository.js";

export default class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }

    async findByName(name){
        return User.findOne({name});
    }

    async findByEmail(email){
        return User.findOne({email});
    }

    async activate(id){
        return User.updateOne({_id:id},{ $set: { isActive: true }});
    }

    async deactivate(id){
        return User.updateOne({_id:id},{ $set: { isActive: false}});
    }


}