import Room from "../models/room.js";

async function index(req, res) {
    try {
        const rooms = await Room.find();
        let message = '';
        if (rooms.length === 0) {
            message = 'No rooms available in the database.';
        }
        res.render('rooms/index', { rooms, message });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        console.log(req.body);
        const fetchedRoom = await Room.findById(req.params.id);
        if (!fetchedRoom) {
            return res.status(404).send("Room not found");
        }
        res.render('rooms/show', { room: fetchedRoom });
    } catch (err) {
        res.status(500).send(err);
    }
}

function create(req, res) {
    res.render('rooms/create');
}

async function store(req, res) {
    try {
        console.log(req.body);
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.redirect('/rooms');
    } catch (err) {
        res.status(500).send(err);
    }
}

async function edit(req, res) {
    try {
        const editedRoom = await Room.findById(req.params.id);
        if (!editedRoom) {
            return res.status(400).send('Room not found');
        }
        res.render('rooms/edit', { room: editedRoom });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRoom) {
            return res.status(404).send('Room not found');
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(400).send(err);
    }
}

async function destroy(req, res) {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).send('Room not found');
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(500).send(err);
    }
}

export default {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy
};
