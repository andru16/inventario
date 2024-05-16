const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/gestion-inventarios/inventarioController');


router.get('/', inventarioController.getInventarios);
router.get('/:id', inventarioController.getInventario);
router.post('/', inventarioController.storeInventario);
router.put('/:id', inventarioController.updateInventario);

module.exports = router;
