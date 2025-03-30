const roomRouter = require("./roomRoutes");
const express = require('express');

const mainRouter = express.Router();

mainRouter.use(roomRouter);

module.exports = mainRouter;