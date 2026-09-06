import UserRepository from "../repositories/userRepository.js";

export default class UserService{
    constructor() {
        this.repository = new UserRepository();
    }

    async getUserById(id){
        const user = await this.repository.findById(id);
        if(!user){
            throw new Error("User not found"); 
        }
        return{
            user:user
        }
    }

    async changeUserRole(){

    }
}