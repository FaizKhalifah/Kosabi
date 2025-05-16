const express = require('express');
const tenantController = require("../controllers/tenantController");

const tenantRouter = express.Router();

tenantRouter.get('/tenants', tenantController.index);
tenantRouter.get('/tenants/add', tenantController.add);
tenantRouter.post('/tenants/add', tenantController.store);