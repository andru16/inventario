const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/gestion-inventarios/proveedoresController');


router.get('/', proveedoresController.listarProveedor);
router.get('/:id', proveedoresController.traerProveedor);
router.post('/crear', proveedoresController.crearProveedor);
router.put('/actualizar/:id', proveedoresController.actualizarProveedor);

module.exports = router;
