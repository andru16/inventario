const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/gestion-inventarios/proveedoresController');


router.get('/', proveedoresController.listarProveedor);
router.get('/:id', proveedoresController.traerProveedor);
router.post('/', proveedoresController.crearProveedor);
router.put('/:id', proveedoresController.actualizarProveedor);

module.exports = router;
