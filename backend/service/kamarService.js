const { Kamar, User } = require('../models');

async function getAllKamarService(req,res) {
    const{page=1,limit=10}=req.query;
    const offset = (page - 1) * limit;

    try{
        const {count,rows} = await Kamar.findAndCountAll({
            include: { model: User, as: 'penyewa' },
            limit: parseInt(limit),
            offset: parseInt(offset),
        })

        const totalPages = Math.ceil(count / limit);

        res.json({
          totalItems: count,
          totalPages,
          currentPage: parseInt(page),
          data: rows,
        });

    }catch(err){
        return res.status(400).json({msg:"Terjadi error"})
    }
}

async function getKamarByIdService(req,res) {
    const kamar = await Kamar.findByPk(req.params.id, { include: { model: User, as: 'penyewa' } });
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    res.json(kamar);
}

async function addKamarService(req,res) {
    const { nomor, status } = req.body;
    const kamar = await Kamar.create({ nomor, status });
    res.status(201).json(kamar);
}

async function updateKamarService(req,res) {
    const { nomor, status } = req.body;
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.update({ nomor, status });
    res.json(kamar);
}

async function deleteKamarService(req,res) {
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.destroy();
    res.status(204).send();
}

async function rentKamarService(req,res) {
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
    getAllKamarService,getKamarByIdService,addKamarService,updateKamarService,deleteKamarService,rentKamarService
};