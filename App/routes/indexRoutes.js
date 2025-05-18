const roomRouter = require("./roomRoutes");
const tenantRouter = require("./tenantRoutes");
const express = require('express');

const mainRouter = express.Router();

mainRouter.use(roomRouter);
mainRouter.use(tenantRouter);

module.exports = mainRouter;