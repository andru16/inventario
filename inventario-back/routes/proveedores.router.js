// routes/proveedorRoutes.js
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/gestion-inventarios/proveedorController');

router.get('/', proveedorController.getProveedores);
router.post('/guardar', proveedorController.storeProveedor);
router.get('/:id', proveedorController.getProveedor);
router.put('/actualizar/:id', proveedorController.updateProveedor);
router.delete('/:id', proveedorController.deleteProveedor);

module.exports = router;
