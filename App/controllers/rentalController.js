const rentalService = require("../services/Repositories/rentalService")

class rentalController{
    async index(req, res) {
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'desc';

        const page = parseInt(req.query.page) || 1;
        const limit = 5; // jumlah item per halaman
        const offset = (page - 1) * limit;

        const sortingOptions = await rentalService.getSortingOption(sortBy, order);
        const { rentals, totalPages } = await rentalService.paginateRentals({
            limit,
            offset,
            order: sortingOptions
        });

        res.render('rentals/index', {
            rentals,
            sortBy,
            order,
            currentPage: page,
            totalPages,
        });
    }

    async add(req, res) {
        const tenants = await rentalService.getAllTenants();
        const rooms = await rentalService.getAllRooms();
        res.render('rentals/add', { rental: null, tenants, rooms });
    }

    async store(req, res) {
        await rentalService.create(req.body);
        res.redirect('/rentals');
    }

    async edit(req, res) {
        const rental = await rentalService.getById(req.params.id);
        const tenants = await rentalService.getAllTenants();
        const rooms = await rentalService.getAllRooms();
        res.render('rentals/edit', { rental, tenants, rooms });
    }
    
    async update(req, res) {
        await rentalService.update(req.body);
        res.redirect('/rentals');
    }
    
    async delete(req, res) {
        await rentalService.delete(req.params.id);
        res.redirect('/rentals');
    }
}

module.exports = new rentalController();