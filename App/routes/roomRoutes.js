const express = require('express');
const roomController = require("../controllers/roomController");
const upload = require("../middleware/imageUpload");
const authMiddleware = require('../middleware/authMiddleware');
const roomRouter = express.Router();

roomRouter.get('/rooms',authMiddleware.isAuthenticated,roomController.index);
roomRouter.get('/rooms/add',authMiddleware.isAuthenticated,roomController.add);
roomRouter.post('/rooms/add',authMiddleware.isAuthenticated,upload.single('photo'),roomController.store);
roomRouter.get('/rooms/:id/edit',authMiddleware.isAuthenticated,roomController.edit);
roomRouter.post('/rooms/:id/edit',authMiddleware.isAuthenticated,upload.single('photo'),roomController.update);
roomRouter.post('/rooms/:id/delete',authMiddleware.isAuthenticated,roomController.delete);

module.exports = roomRouter;