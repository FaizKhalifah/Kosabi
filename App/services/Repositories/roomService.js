const model = require("../../models");
const { Op } = require('sequelize');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const deletePhotoUtil = require("../../utilities/deletePhotoUtil");

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

    async getById(id){
        return await Room.findByPk(id);
    }

    async create(data, photoPath){
        console.log("photoPath : " + photoPath);
        const {number,type,price} = data;
        return await Room.create({number,type,price,photo:photoPath});
    }

    // async update(data,photoPath){
    //     const {id,number,type,price} =  data;
    //     return await Room.update({number,type,price,photo:photoPath},{where:{id}});
    // }

    async update(data, photoPath) {
        const { id, number, type, price } = data;
    
        const room = await Room.findByPk(id);
    
        if (!room) {
            throw new Error("Room not found");
        }
    
        if (photoPath && room.photo) {
            const oldPath = path.join('public', room.photo);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }
    
        const updateData = { number, type, price };
        if (photoPath) {
            updateData.photo = photoPath;
        }
        console.log(photoPath)
        console.log("updateData : " + updateData.number + " " + updateData.type + " " + updateData.price + " " + updateData.photo);
        return await Room.update(updateData, { where: { id } });
    }

    async delete(id) {
        const room = await Room.findByPk(id);
        if (!room) {
            throw new Error("Room not found");
        }
        if (room.photo) {
            deletePhotoUtil(room.photo);
        }
        return await Room.destroy({ where: { id } });
    }
}

module.exports = new roomService();