const roomService = require("../services/Repositories/roomService");

class roomController{
    async index(req,res){
        const rooms = await roomService.getAll();
        res.render('rooms/index',{rooms});
    }

    async add(req,res){
        res.render('rooms/add',{room:null});
    }

    async store(req,res){
        console.log("request : " + req)
        console.log("request body : " + req.body);
        await roomService.create(req.body);
        res.redirect('/rooms');
    }

    async delete(req, res) {
        await roomService.delete(req.params.id);
        res.redirect('/rooms');
    }
}


module.exports = new roomController();