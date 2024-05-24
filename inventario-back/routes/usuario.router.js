const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/gestion-inventarios/usuariosController');


router.get('/', usuariosController.listarUsuarios);
router.get('/:id', usuariosController.traerUsuario);
router.post('/', usuariosController.crearUsuario);
router.put('/:id', usuariosController.actualizarUsuario);

module.exports = router;
