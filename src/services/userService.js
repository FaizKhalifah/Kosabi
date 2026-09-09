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

    async changeUserRole(id, role){
        const user = await this.repository.findById(id);
        if(!user){
            throw new Error("User not found"); 
        }
        if (user.role == role){
            throw new Error("cannot change to the same role");
        }
        user.role == role;
        return{
            message:`user role changed to ${role}`
        }
    }

    async updateUserProfile(id,data){
        try{
            const user = await this.repository.findById(id);
            if(!user){
                throw new Error("User not found"); 
            }
            await this.repository.update(id,data);
            return{
                message:"user profile updated"
            }
        }catch(err){
            return err.message
        }
    }

    async activateUser(id){
        try{
            const user = await this.repository.findById(id);
            if(!user){
                throw new Error("User not found"); 
            }
            if(user.isActive==true){
                throw new Error("User already active"); 
            }
            await this.repository.activate(id);
            return{
                message:`user with the id ${id} has been activated`
            }
        }catch(err){
            return err.message
        }
    }

    async deactivateUser(id){
        try{
            const user = await this.repository.findById(id);
            if(!user){
                throw new Error("User not found"); 
            }
            if(user.isActive==false){
                throw new Error("User already non active"); 
            }
            await this.repository.deactivate(id);
            return{
                message:`user with the id ${id} has been deactivated`
            }
        }catch(err){
            return err.message
        }
    }
}