import UserRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import APP_SECRET from "../config/index.js";

export default class AuthService{
    constructor() {
        this.repository = new UserRepository();
    }

    async registerAdmin(data){
        try{
        const { name, email, phone, password, confirmPassword } = data; 
        if (!name) { 
            throw new Error("Admin name is required"); 
        } 
        if (!email) { 
            throw new Error("Admin email is required"); 
        } 
        if (!phone) { 
            throw new Error("Admin phone number is required"); 
        } 
        if (!password) { 
            throw new Error("Admin password is required"); 
        } 
        if (password !== confirmPassword) { 
            throw new Error("Password didn't match"); 
        }

        const existingUser = await this.repository.findByEmail(email);
        if(existingUser){
            throw new Error("Email is already registered");
        }


        const hashedPassword = await bcrypt.hash(data.password,10);
        data.password = hashedPassword;
        const user = await this.repository.create(
            { name, email, phone, password: hashedPassword, role: "ADMIN", isActive: true }
        );
        
        const token = jwt.sign({
            id:data.id,
            name:data.name,
            role:data.role
        }, 
        APP_SECRET,
        { expiresIn: '1h' }
        )
        return { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, token:token };
        }catch(err){
            return err.message
        }
        
    }

    async registerTenant(data){
        try{
            const hashedPassword = await bcrypt.hash(data.password,10);
            data.password = hashedPassword;
            data.role = "TENANT";
            const Tenant = await this.repository.create(data);
            const token = jwt.sign({
                id:data.id,
                name:data.name,
                role:data.role
            }, 
            APP_SECRET,
            { expiresIn: '1h' }
            )

            return {tenant:Tenant, token};
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
            const token = jwt.sign({ id: admin.id, name:admin.name, role:admin.role }, APP_SECRET, { expiresIn: '1h' });
            return { admin, token };
        }catch(err){
            return err.message
        }
    }

    async changePassword(data){
        try{
            const user = await this.repository.findByEmail(data.email);
            if(!user){
                throw new Error("user email not found");
            }
            if(user.password == data.newPassword){
                throw new Error("new password cannot be the same as the old password");
            }
            const newPassword = await bcrypt.hash(data.newPassword,10);
            user.password == newPassword;
            return {message:"user password has been changed"}
        }catch(err){
            return err.message
        }
    }

}