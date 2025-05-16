const tenantService = require('../services/tenantService');

class TenantController {
    async index(req, res) {
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'desc';

        const page = parseInt(req.query.page) || 1;
        const limit = 5; // jumlah item per halaman
        const offset = (page - 1) * limit;

        const sortingOptions = await tenantService.getSortingOption(sortBy, order);
        const { tenants, totalPages } = await tenantService.paginateTenants({
            limit,
            offset,
            order: sortingOptions
        });

        res.render('tenants/index', {
            tenants,
            sortBy,
            order,
            currentPage: page,
            totalPages,
        });
    }

    async add(req, res) {
        res.render('tenants/add', { tenant: null });
    }
    
    async store(req, res) {
        try {
            await tenantService.create(req.body);
            res.redirect('/tenants');
        } catch (error) {
            console.error("Error creating tenant:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new TenantController();