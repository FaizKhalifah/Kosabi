const model = require("../../models");
const Room = model.Room;
class roomService{
    async getAll(){
        return await Room.findAll();
    }

    async getById(id){
        return await Room.findByPk(id);
    }

    async create(data){
        console.log("data room untuk dicreate : " + data)
        const {number,type,price} = data;
        return await Room.create({number,type,price});
    }

    async update(data,id){
        const {number,type,price} =  data;
        return await Room.update({number,type,price},{where:{id}});
    }

    async delete(id) {
        return await Room.destroy({ where: { id } });
    }
}

module.exports = new roomService();