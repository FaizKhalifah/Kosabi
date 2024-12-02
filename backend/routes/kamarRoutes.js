const express = require('express');
const router = express.Router();
const { getAllKamar,getKamarById,addKamar,updateKamar,deleteKamar,rentKamar} = require('../controller/kamarController.js')
const authMiddleware = require ("../middleware/authMiddleware.js")
// Get all rooms
router.get('/', authMiddleware,getAllKamar);
  
  // Get room by ID
  router.get('/:id', authMiddleware,getKamarById);
  
  // Create new room
  router.post('/', authMiddleware,addKamar);
  
  // Update room
  router.put('/:id',authMiddleware, updateKamar);
  
  // Delete room
  router.delete('/:id',authMiddleware, deleteKamar);

  // User rent a room
router.post('/:id/rent',authMiddleware,rentKamar);
  
  
  module.exports = router;