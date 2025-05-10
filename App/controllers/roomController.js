const roomService = require("../services/Repositories/roomService");

class roomController{
    async index(req,res){
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'desc';

        const page = parseInt(req.query.page) || 1;
        const limit = 5; // jumlah item per halaman
        const offset = (page - 1) * limit;

        const sortingOptions = await roomService.getSortingOption(sortBy,order);
        const { rooms, totalPages } = await roomService.paginateRooms({
        limit,
        offset,
        order:sortingOptions
    });

        res.render('rooms/index', {
            rooms,
            sortBy,
            order,
            currentPage: page,
            totalPages,
        });
    }

    async add(req,res){
        res.render('rooms/add',{room:null});
    }

    async store(req,res){
        console.log("request : " + req)
        const photoPath = req.file ? '/uploads/rooms/' + req.file.filename : null;
        await roomService.create(req.body,photoPath);
        res.redirect('/rooms');
    }

    async edit(req,res){
        const room = await roomService.getById(req.params.id);
        res.render('rooms/edit',{room})
    }

    async update(req, res) {
        const photoPath = req.file ? '/uploads/rooms/' + req.file.filename : null;
        console.log("photo path di controller : " + photoPath);
        await roomService.update(req.body, photoPath); // semua diserahkan ke service
        res.redirect('/rooms');
    }
    

    async delete(req, res) {
        await roomService.delete(req.params.id);
        res.redirect('/rooms');
    }
}


module.exports = new roomController();