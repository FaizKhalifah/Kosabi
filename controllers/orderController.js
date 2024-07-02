import Room from "../models/room.js";

async function index(){
    try {
        const rooms = await Room.find();
        let message = '';
        if (rooms.length === 0) {
            message = 'No rooms available in the database.';
        }
        res.render('order/index', { rooms, message });
    } catch (err) {
        res.status(500).send(err);
    }
}

export default{
    index
}