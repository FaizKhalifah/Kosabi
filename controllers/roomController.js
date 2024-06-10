import room from "../models/room.js"


async function index(req,res){
    try{
        const rooms = await room.find();
        res.render('rooms/index',{rooms});
    }catch(err){
        res.status(500).send(err);
    }
}

async function show(req,res){
    try{
        const fetchedRoom = room.findById(req.params.id);
        if(!fetchedRoom){
            return res.status(404).send("error");
        }
        res.render('rooms/show',{fetchedRoom});
    }catch(err){
        res.status(500).send(err);
    }
}

function create(req,res){
    res.render('rooms/create');
}


async function store(req, res){
    try{
        const newRoom = new room(req.body);
        await newRoom.save();
        res.redirect('/rooms');
    }catch(err){
        res.status(500).send(err);
    }
}

async function edit(req,res){
    try{
        const editedRoom = await room.findById(req.params.id);
        if(!editedRoom){
            res.status(400).send('room not found');
        }
        res.render('rooms/edit',{editedRoom});
    }catch(err){
        res.status(500).send(err);
    }
}


async function update(req,res){
    try {
        const updatedRoom = await room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRoom) {
            return res.status(404).send();
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(400).send(err);
    }
};

async function destroy(req,res){
    try {
        const deletedRoom = await room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).send();
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default {
    index,create,store,edit,update,destroy
}