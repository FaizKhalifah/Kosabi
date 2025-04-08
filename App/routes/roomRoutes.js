const express = require('express');
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get('/rooms',roomController.index);
roomRouter.get('/rooms/add',roomController.add);
roomRouter.post('/rooms/add',roomController.store);
roomRouter.get('/rooms/:id/edit',roomController.edit);
roomRouter.post('/rooms/:id/delete',roomController.delete);

module.exports = roomRouter;