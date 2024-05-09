const express = require('express')
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.get('/get-paises', reservasController.getPaises);
router.get('/load-paises', reservasController.loadPaises);
router.get('/paises', reservasController.searchPaises);
router.get('/get-reservas', reservasController.getReservas);
router.post('/store-reserva', reservasController.storeReserva);


module.exports = router;
