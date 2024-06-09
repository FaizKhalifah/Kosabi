import room from "../models/room.js"

async function createRoom(req, res){
    try{
        const newRoom = new room(req.body);
        await newRoom.save();
        res.status(201).send(newRoom);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getAllRooms(req,res){
    try{
        const rooms = await room.find();
        res.status(200).send(rooms);
    }catch(err){
        res.status(400).send(err);
    }
}

async function getRoombyId(req,res){
    try{
        const fetchedRoom = room.findById(req.params.id);
        if(!fetchedRoom){
            return res.status(404).send("error");
        }
        res.status(200).send(fetchedRoom);
    }catch(err){
        res.status(400).send(err);
    }
}

async function updateRoom(req,res){
    try {
        const updatedRoom = await room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRoom) {
            return res.status(404).send();
        }
        res.status(200).send(updatedRoom);
    } catch (err) {
        res.status(400).send(err);
    }
};

async function deleteRoom(req,res){
    try {
        const deletedRoom = await room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).send();
        }
        res.status(200).send(deletedRoom);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default {
    createRoom,getAllRooms,getRoombyId,updateRoom,deleteRoom
}