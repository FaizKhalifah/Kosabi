const model = require("../../models");

const Tenant = model.Tenant;
const Room = model.Room;
const Rental = model.Rental;
class RentalService {
    async getAll() {
        return await Rental.findAll({
            include: [
                { model: Tenant },
                { model: Room }
            ]
        });
    }

    async getAllTenants() {
        return await Tenant.findAll();
    }

    async getAllRooms() {
        return await Room.findAll();
    }
    
    async getSortingOption(sortBy, order) {
        const validSortFields = ['startDate', 'endDate',  'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = ['asc', 'desc'].includes(order) ? order : 'desc';

        return [[sortField, sortOrder]];
    }

    async paginateRentals({ limit, offset, order }) {
        const { count, rows } = await Rental.findAndCountAll({
            limit,
            offset,
            order,
            include: [
                { model: Tenant},
                { model: Room }
            ]
        });

        const totalPages = Math.ceil(count / limit);

        return { rentals: rows, totalPages };
    }

    async getById(id) {
        const rental = await Rental.findByPk(id, {
            include: [
                { model: Tenant, as: 'tenant' },
                { model: Room, as: 'room' }
            ]
        });
        if (!rental) {
            throw new Error("Rental not found");
        }
        return rental;
    }

    async create(data){
        const { tenantId, roomId, startDate, endDate, status, notes } = data;
        const isTenantExists = await Rental.findOne({
            where: {
                tenantId,
                status: 'active'
            }
        });
        if (isTenantExists) {
            throw new Error("This tenant already has an active rental.");
        }
        const isRoomExists = await Rental.findOne({
            where: {
                roomId,
                status: 'active'
            }
        });
        if (isRoomExists) {
            throw new Error("This room is already rented.");
        }

        return await Rental.create({
            tenantId,
            roomId,
            startDate,
            endDate,
            status,
            notes
        });

    }

    async update(data) {
        const { id, tenantId, roomId, startDate, endDate, status, notes } = data;

        const rental = await Rental.findByPk(id);
        if (!rental) {
            throw new Error("Rental not found");
        }

        const isTenantExists = await Rental.findOne({
            where: {
                tenantId,
                status: 'active',
                id: { [model.Sequelize.Op.ne]: id }
            }
        });
        if (isTenantExists) {
            throw new Error("This tenant already has an active rental.");
        }

        const isRoomExists = await Rental.findOne({
            where: {
                roomId,
                status: 'active',
                id: { [model.Sequelize.Op.ne]: id }
            }
        });
        if (isRoomExists) {
            throw new Error("This room is already rented.");
        }

        return await Rental.update(
            { tenantId, roomId, startDate, endDate, status, notes },
            { where: { id } }
        );
    }

    async delete(id) {
        const rental = await Rental.findByPk(id);
        if (!rental) {
            throw new Error("Rental not found");
        }
        return await Rental.destroy({ where: { id } });
    }
}

module.exports = new RentalService();