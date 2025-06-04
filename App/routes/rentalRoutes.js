const express = require('express');
const rentalController = require("../controllers/rentalController");
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have an auth middleware
const rentalRouter = express.Router();
rentalRouter.get('/rentals',authMiddleware.isAuthenticated, rentalController.index);
rentalRouter.get('/rentals/add', authMiddleware.isAuthenticated,rentalController.add);
rentalRouter.post('/rentals/add',authMiddleware.isAuthenticated, rentalController.store);
rentalRouter.get('/rentals/:id/edit',authMiddleware.isAuthenticated, rentalController.edit);   
rentalRouter.post('/rentals/:id/edit',authMiddleware.isAuthenticated, rentalController.update);
rentalRouter.post('/rentals/:id/delete',authMiddleware.isAuthenticated, rentalController.delete);

module.exports = rentalRouter;