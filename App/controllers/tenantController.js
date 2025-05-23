const tenantService = require('../services/Repositories/tenantService');

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
            console.log("Creating tenant with data:", req.body);
            await tenantService.create(req.body);
            res.redirect('/tenants');
        } catch (error) {
            console.error("Error creating tenant:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    async edit(req, res) {
        const tenant = await tenantService.findById(req.params.id);
        if (!tenant) {
            return res.status(404).send('Tenant not found');
        }
        res.render('tenants/edit', { tenant });
    }

    async update(req, res) {
        try {
            const tenant = await tenantService.findById(req.params.id);
            if (!tenant) {
                return res.status(404).send('Tenant not found');
            }
            await tenantService.update(req.params.id, req.body);
            res.redirect('/tenants');
        } catch (error) {
            console.error("Error updating tenant:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    async delete(req, res) {
        try {
            const tenant = await tenantService.findById(req.params.id);
            if (!tenant) {
                return res.status(404).send('Tenant not found');
            }
            await tenantService.delete(req.params.id);
            res.redirect('/tenants');
        } catch (error) {
            console.error("Error deleting tenant:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new TenantController();