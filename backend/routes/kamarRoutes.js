const express = require('express');
const router = express.Router();
const { Kamar, User } = require('../models');
const { getAllKamar,getKamarById,addKamar,updateKamar,deleteKamar,rentKamar} = require('../controller/kamarController.js')

// Get all rooms
router.get('/', getAllKamar);
  
  // Get room by ID
  router.get('/:id', getKamarById);
  
  // Create new room
  router.post('/', addKamar);
  
  // Update room
  router.put('/:id', updateKamar);
  
  // Delete room
  router.delete('/:id', deleteKamar);

  // User rent a room
router.post('/:id/rent',rentKamar);
  
  
  module.exports = router;