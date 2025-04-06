const express = require('express');
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get('/rooms',roomController.index);
roomRouter.get('/rooms/add',roomController.add);
roomRouter.post('/rooms/add',roomController.store);

module.exports = roomRouter;