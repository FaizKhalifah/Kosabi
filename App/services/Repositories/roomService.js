const Room = require("../../models/room");
class roomService{
    async getAll(){
        return await Room.findAll();
    }

    async getById(id){
        return await Room.findByPk(id);
    }

    async create(data){
        return await Room.create(data);
    }

    async update(data,id){
        return await Room.update(data,{where:{id}});
    }

    async delete(id) {
        return await Room.destroy({ where: { id } });
    }
}

module.exports = new roomService();