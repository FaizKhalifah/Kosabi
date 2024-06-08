import room from "../Entity/room,js";

async function addRoom(nomor_kamar,harga){
    const newRoom = new room({
        nomor_kamar:nomor_kamar,
        harga:harga
    })
    await newRoom.save();
    return;
}

async function deleteRoom(nomor_kamar){
    await room.deleteOne({ nomor_kamar:nomor_kamar})
    return;
}

export default {
    addRoom,deleteRoom
}