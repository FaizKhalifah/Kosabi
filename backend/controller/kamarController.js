const { Kamar, User } = require('../models');

async function getAllKamar(req,res) {
    const kamar = await Kamar.findAll({ include: { model: User, as: 'penyewa' } });
    res.json(kamar);
}

async function getKamarById(req,res) {
    const kamar = await Kamar.findByPk(req.params.id, { include: { model: User, as: 'penyewa' } });
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    res.json(kamar);
}

async function addKamar(req,res) {
    const { nomor, status } = req.body;
    const kamar = await Kamar.create({ nomor, status });
    res.status(201).json(kamar);
}

async function updateKamar(req,res) {
    const { nomor, status } = req.body;
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.update({ nomor, status });
    res.json(kamar);
}

async function deleteKamar(req,res) {
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.destroy();
    res.status(204).send();
}

async function rentKamar(req,res) {
    const { userId } = req.body; // ID user yang ingin menyewa
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar || kamar.status === 'disewa') return res.status(400).json({ error: 'Room is not available' });
  
    const user = await User.findByPk(userId);
    if (!user || user.kamarId) return res.status(400).json({ error: 'User has already rented a room' });
  
    await kamar.update({ status: 'disewa' });
    await user.update({ kamarId: kamar.id });
  
    res.json({ message: 'Room rented successfully', kamar });

}

module.exports = {
    getAllKamar,getKamarById,addKamar,updateKamar,deleteKamar,rentKamar
};