const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/gestion-inventarios/usuariosController');


router.get('/', usuariosController.listarUsuarios);
router.get('/:listar-usuarios', usuariosController.traerUsuario);
router.post('/crear-usuario', usuariosController.crearUsuario);
router.put('/editar-usuario/:id', usuariosController.actualizarUsuario);

module.exports = router;
