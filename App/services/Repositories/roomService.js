const model = require("../../models");
const { Op } = require('sequelize');

const Room = model.Room;
class roomService{
    async getAll(){
        return await Room.findAll();
    }

    async searchRooms(keyword) {
        if (!keyword) {
            return await Room.findAll({ order: [['createdAt', 'DESC']] });
        }
    
        return await Room.findAll({
            where: {
                [Op.or]: [
                    { number: { [Op.iLike]: `%${keyword}%` } },
                    { type: { [Op.iLike]: `%${keyword}%` } },
                ]
            },
            order: [['createdAt', 'DESC']]
        });
    }

    async  paginate({ limit, offset }) {
        const { count, rows } = await Room.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });
    
        const totalPages = Math.ceil(count / limit);
    
        return { rooms: rows, totalPages };
    }

    async getById(id){
        return await Room.findByPk(id);
    }

    async create(data){
        console.log("data room untuk dicreate : " + data)
        const {number,type,price} = data;
        return await Room.create({number,type,price});
    }

    async update(data){
        console.log("data di service : " + data);
        const {id,number,type,price} =  data;
        return await Room.update({number,type,price},{where:{id}});
    }

    async delete(id) {
        return await Room.destroy({ where: { id } });
    }
}

module.exports = new roomService();