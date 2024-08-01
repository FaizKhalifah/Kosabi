import Room from "../models/room.js";

async function index(req,res){
    try{
        const rooms = await Room.find();
        let message = '';
        if(rooms.length===0){
            message="no room available";
        }
        res.render('admin/rooms/index',{rooms,message});
    }catch(err){
        res.status(500).send(err);
    }
}

async function create(req,res){
    res.render('admin/rooms/create');
}

async function store(req,res){
    try{
        const room = new Room(req.body);
        await room.save();
        res.redirect('/dashboard/rooms');
    }catch(err){
        res.status(500).send(err);
    }
}

async function edit(req,res){
    try{
        const room = await Room.findById(req.params.id);
        if(!room){
            res.status(400).send('room not found');
        }else{
            res.render('admin/rooms/edit',{room});
        }
    }catch(err){
        res.status(500).send(err);
    }
}

async function update(){
    try{
        const room = await Room.findByIdAndUpdate(req.params.id, req.body);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.redirect('admin/rooms/index');
    }catch(err){
        res.status(500).send(err);
    }
}

async function destroy(req,res){
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).send('Room not found');
        }
        res.redirect('/dashboard/rooms');
    } catch (err) {
        res.status(500).send(err);
    }
}
           
export default{
    index,create,store,edit,update,destroy
}