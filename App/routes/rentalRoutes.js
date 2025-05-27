const express = require('express');
const rentalController = require("../controllers/rentalController");

const rentalRouter = express.Router();
rentalRouter.get('/rentals', rentalController.index);
rentalRouter.get('/rentals/add', rentalController.add);
rentalRouter.post('/rentals/add', rentalController.store);
rentalRouter.get('/rentals/:id/edit', rentalController.edit);   
rentalRouter.post('/rentals/:id/edit', rentalController.update);
rentalRouter.post('/rentals/:id/delete', rentalController.delete);

module.exports = rentalRouter;