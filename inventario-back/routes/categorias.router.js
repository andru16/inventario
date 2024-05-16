const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/gestion-inventarios/categoriaController');


router.get('/', categoriasController.getCategorias);
router.get('/:id', categoriasController.getCategoria);
router.post('/', categoriasController.storeCategoria);
router.put('/:id', categoriasController.updateCategoria);

module.exports = router;
