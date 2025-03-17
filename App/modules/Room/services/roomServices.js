const {Room} = require("../../../../models/room");
const {IRoomServices} = require("./IRoomServices");

class roomServices extends IRoomServices{
    async findAll(){
        return await Room.findAll();
    }

    async findById(id) {
        return await Room.findByPk(id);
    }

    async create(userData) {
        return await Room.create(userData);
      }
    
      async update(id, updatedData) {
        return await Room.update(updatedData, { where: { id } });
      }
    
      async delete(id) {
        return await Room.destroy({ where: { id } });
      }
}

module.exports = new roomServices();