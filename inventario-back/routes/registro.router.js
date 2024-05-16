const express = require('express');
const router = express.Router();
const registroController = require('../controllers/gestion-inventarios/registroController');


router.get('/', registroController.getRegistros);
router.get('/:id', registroController.getRegistro);
router.post('/', registroController.storeRegistro);
router.put('/:id', registroController.updateRegistro);

module.exports = router;
