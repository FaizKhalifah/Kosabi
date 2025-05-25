const model = require("../../models");

const Tenant = model.Tenant;
const Room = model.Room;
const Rental = model.Rental;
class RentalService {
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
}

module.exports = new RentalService();