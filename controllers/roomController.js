import Room from "../models/room.js";


async function index(req,res){
    try{
        const rooms = await Room.find();
        res.render('rooms/index',{rooms});
    }catch(err){
        res.status(500).send(err);
    }
}

async function show(req,res){
    try{
        const room = Room.findById(req.params.id);
        if(!room){
            return res.status(404).send("error");
        }
        res.render('rooms/show',{room});
    }catch(err){
        res.status(500).send(err);
    }
}

function create(req,res){
    res.render('rooms/create');
}


async function store(req, res){
    try{
        const room = new Room(req.body);
        await room.save();
        res.redirect('/rooms');
    }catch(err){
        res.status(500).send(err);
    }
}

async function edit(req,res){
    try{
        const room = await Room.findById(req.params.id);
        if(!room){
            res.status(400).send('room not found');
        }
        res.render('rooms/edit',{room});
    }catch(err){
        res.status(500).send(err);
    }
}


async function update(req,res){
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!room) {
            return res.status(404).send();
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(400).send(err);
    }
};

async function destroy(req,res){
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.redirect('/rooms');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default {
    index,show,create,store,edit,update,destroy
}