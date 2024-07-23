import User from "../models/user.js";

async function index(req,res){
    try{
        const users = await User.find();
        let message = '';
        if(users.length==0){
            message="No User currently";
        }
        res.render('admin/users/index',{users,message});
    }catch(err){
        res.status(500).send(err);
    }
   
}

export default{
    index
}