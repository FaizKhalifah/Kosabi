const express = require('express');
const tenantController = require("../controllers/tenantController");
const authMiddleware = require('../middleware/authMiddleware'); 
const tenantRouter = express.Router();

tenantRouter.get('/tenants',authMiddleware.isAuthenticated, tenantController.index);
tenantRouter.get('/tenants/add',authMiddleware.isAuthenticated, tenantController.add);
tenantRouter.post('/tenants/add',authMiddleware.isAuthenticated, tenantController.store);
tenantRouter.get('/tenants/:id/edit',authMiddleware.isAuthenticated, tenantController.edit);
tenantRouter.post('/tenants/:id/edit',authMiddleware.isAuthenticated, tenantController.update);
tenantRouter.post('/tenants/:id/delete',authMiddleware.isAuthenticated, tenantController.delete);

module.exports = tenantRouter;