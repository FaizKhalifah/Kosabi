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
                throw new Error("Admin assword is required");
            case data.password !== data.confirmedPassowrd:
                throw new Error("Password didn't match");

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

        return {admin:data, token};
        }catch(err){
            return err.message
        }
        
    }

    async registerTenant(data){
        try{
            switch(data){
                case !data.name:
                    throw new Error("Tenant name is required");
                case !data.email:
                    throw new Error("Tenant email is required");
                case !data.phone :
                    throw new Error("Tenant phone number is required");
                case !data.password:
                    throw new Error("Tenant Password is required");
            }
        const hashedPassword = await bcrypt.hash(data,10);
        data.password = hashedPassword;
        data.role = "TENANT";
        const token = jwt.sign({
            id:data.id,
            name:data.name,
            role:data.role
        }, 
        'your_jwt_secret',
        { expiresIn: '1h' }
        )

        return {tenant:data, token};
        }catch(err){
            return err.message
        }
    }

    async adminLogin(data){
        try{
            const admin = await this.repository.findByEmail(data.email);
            if(!admin){
                throw new Error("Admin email not found");
            }
            const isPasswordValid = await bcrypt.compare(data.password, admin.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            const token = jwt.sign({ id: admin.id, name:admin.name, role:admin.role }, 'your_jwt_secret', { expiresIn: '1h' });
            return { admin, token };
        }catch(err){
            return err.message
        }
    }

    async changePassword(data){
        try{
            
        }catch(err){
            return err.message
        }
    }

    async forgotPassword(){

    }
}