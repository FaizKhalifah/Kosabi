const express = require('express');
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get('/rooms',roomController.index);

module.exports = roomRouter;