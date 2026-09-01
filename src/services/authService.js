import UserRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthService{
    constructor() {
        this.repository = UserRepository();
    }

    async registerAdmin(data){
        try{
            switch(data){
            case !data.name:
                throw new Error("Admin name is required");
            case !data.email:
                throw new Error("Admin email is required");
            case !data.phone :
                throw new Error("Admin phone number is required");
            case !data.password:
                throw new Error("Password is required");
        }
        const hashedPassword = await bcrypt.hash(data,10);
        data.password = hashedPassword;
        data.role = "ADMIN";
        const token = jwt.sign({
            id:data.id,
            name:data.name,
            role:data.role
        }, 
        'your_jwt_secret',
        { expiresIn: '1h' }
        )

        return {user:data, token};
        }catch(err){
            return err.message
        }
        
    }

    async registerTenant(){

    }

    async adminLogin(){

    }

    async adminLogOut(){

    }

    async changePassword(){

    }

    async forgotPassword(){

    }
}