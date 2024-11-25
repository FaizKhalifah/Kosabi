const express = require('express');
const router = express.Router();
const { Kamar, User } = require('../models');

// Get all rooms
router.get('/', async (req, res) => {
    const kamar = await Kamar.findAll({ include: { model: User, as: 'penyewa' } });
    res.json(kamar);
  });
  
  // Get room by ID
  router.get('/:id', async (req, res) => {
    const kamar = await Kamar.findByPk(req.params.id, { include: { model: User, as: 'penyewa' } });
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    res.json(kamar);
  });
  
  // Create new room
  router.post('/', async (req, res) => {
    const { nomor, status } = req.body;
    const kamar = await Kamar.create({ nomor, status });
    res.status(201).json(kamar);
  });
  
  // Update room
  router.put('/:id', async (req, res) => {
    const { nomor, status } = req.body;
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.update({ nomor, status });
    res.json(kamar);
  });
  
  // Delete room
  router.delete('/:id', async (req, res) => {
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar) return res.status(404).json({ error: 'Room not found' });
    await kamar.destroy();
    res.status(204).send();
  });

  // User rent a room
router.post('/:id/rent', async (req, res) => {
    const { userId } = req.body; // ID user yang ingin menyewa
    const kamar = await Kamar.findByPk(req.params.id);
    if (!kamar || kamar.status === 'disewa') return res.status(400).json({ error: 'Room is not available' });
  
    const user = await User.findByPk(userId);
    if (!user || user.kamarId) return res.status(400).json({ error: 'User has already rented a room' });
  
    await kamar.update({ status: 'disewa' });
    await user.update({ kamarId: kamar.id });
  
    res.json({ message: 'Room rented successfully', kamar });
  });
  
  
  module.exports = router;