const roomRouter = require("./roomRoutes");
const tenantRouter = require("./tenantRoutes");
const rentalRouter = require("./rentalRoutes");
const express = require('express');

const mainRouter = express.Router();

mainRouter.use(roomRouter);
mainRouter.use(tenantRouter);
mainRouter.use(rentalRouter);

module.exports = mainRouter;