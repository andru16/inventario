const express = require('express')
const router = express.Router();
const articulosController = require('../controllers/gestion-inventarios/articulosController');

router.get('/', articulosController.getArticulos);
router.get('/:id',articulosController.getArticulo)
router.post('/guardar', articulosController.storeArticulo);
router.put('/actualizar/:id', articulosController.updateArticulo);
router.put('/actualizar-existencias/:id', articulosController.updateExistenciaArticulo);

module.exports = router;
