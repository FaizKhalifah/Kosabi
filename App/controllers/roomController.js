const roomService = require("../services/Repositories/roomService");

class roomController{
    async index(req,res){
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'desc';

        const page = parseInt(req.query.page) || 1;
        const limit = 5; // jumlah item per halaman
        const offset = (page - 1) * limit;

        const { rowCount, totalPages } = await roomService.paginate({ limit, offset });

        const rooms = await roomService.sortRooms(sortBy, order);

        res.render('rooms/index', {
            rooms,
            rowCount,
            sortBy,
            order,
            currentPage: page,
            totalPages
        });
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

    async edit(req,res){
        const room = await roomService.getById(req.params.id);
        res.render('rooms/edit',{room})
    }

    async update(req,res){
        console.log(req.body);
        await roomService.update(req.body);
        res.redirect('/rooms');
    }

    async delete(req, res) {
        await roomService.delete(req.params.id);
        res.redirect('/rooms');
    }
}


module.exports = new roomController();