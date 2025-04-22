const model = require("../../models");
const { Op } = require('sequelize');
const multer = require("multer");

const Room = model.Room;
class roomService{
    async getAll(){
        return await Room.findAll();
    }

    async getSortingOption( sortBy, order){
        const validSortFields = ['number', 'type', 'price', 'createdAt'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const sortOrder = ['asc', 'desc'].includes(order) ? order : 'desc';

        return [[sortField, sortOrder]];
    }

    async  paginateRooms({ limit, offset, order }) {
        const { count, rows } = await Room.findAndCountAll({
            limit,
            offset,
            order
        });
    
        const totalPages = Math.ceil(count / limit);
    
        return { rooms: rows, totalPages };
    }

    async uploadRoomPhoto(){
        const upload = multer({dest:'uploads/roomPhotos/'});
        upload.single('file');
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