const roomRouter = require("./roomRoutes");
const tenantRouter = require("./tenantRoutes");
const rentalRouter = require("./rentalRoutes");
const accountRouter = require("./accountRoutes");
const express = require('express');

const mainRouter = express.Router();

mainRouter.use(roomRouter);
mainRouter.use(tenantRouter);
mainRouter.use(rentalRouter);
mainRouter.use(accountRouter);
module.exports = mainRouter;