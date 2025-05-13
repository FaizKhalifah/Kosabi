const model = require("../../models");
const { Op } = require('sequelize');

const Tenant = model.Tenant;
class tenantService {
    async getAll() {
        return await Tenant.findAll();
    }

    async getById(id) {
        return await Tenant.findByPk(id);
    }

    async create(data) {
        const { fullName, username, email, password, nik, domisili, roomId } = data;
        return await Tenant.create({ fullName, username, email, password, nik, domisili, roomId });
    }
}

module.exports = new tenantService();