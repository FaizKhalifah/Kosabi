const model = require("../../models");
const { Op } = require('sequelize');

const Tenant = model.Tenant;
class tenantService {
    async getAll() {
        return await Tenant.findAll();
    }

    async getSortingOption(sortBy, order) {
        const validSortFields = ['fullName', 'username', 'email', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = ['asc', 'desc'].includes(order) ? order : 'desc';

        return [[sortField, sortOrder]];
    }

    async paginateTenants({ limit, offset, order }) {
        const { count, rows } = await Tenant.findAndCountAll({
            limit,
            offset,
            order
        });

        const totalPages = Math.ceil(count / limit);

        return { tenants: rows, totalPages };
    }
    async getById(id) {
        if (!id) {
            throw new Error("Tenant ID is required");
        }

        const tenant = await Tenant.findByPk(id);
        if (!tenant) {
            throw new Error("Tenant not found");
        }
        return tenant;
    }

    async create(data) {
        console.log("Creating tenant with data:", data);
        const existingTenant = await Tenant.findOne({
            where: {
                [Op.or]: [
                    { email: data.email },
                    { username: data.username }
                ]
            }
        });
        if (existingTenant) {
            throw new Error("Email or username already exists");
        }
        const { fullName, username, email, password, nik, domisili, roomId } = data;
        return await Tenant.create({ fullName, username, email, password, nik, domisili, roomId });
    }

    async update(data) {
        const { id, fullName, username, email, password, nik, domisili, roomId } = data;

        console.log("Updating tenant with data:", data);
        const tenant = await Tenant.findByPk(id);

        if (!tenant) {
            throw new Error("Tenant not found");
        }

        return await Tenant.update({ fullName, username, email, password, nik, domisili, roomId }, { where: { id } });
    }

    async delete(id) {
        const tenant = await Tenant.findByPk(id);

        if (!tenant) {
            throw new Error("Tenant not found");
        }

        return await Tenant.destroy({ where: { id } });
    }
}

module.exports = new tenantService();