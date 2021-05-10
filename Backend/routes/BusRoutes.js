const express = require('express');

const router = express.Router();

const BusController = require('../controllers/BusController');

router.get('/', BusController.index);
router.get('/show/:BusID', BusController.show);
router.post('/store', BusController.store);
router.post('/update', BusController.update);
router.get('/delete/:BusID', BusController.destroy);
router.get('/clear/:BusID', BusController.clear);
router.get('/countTickets/:BusID', BusController.countTickets);
module.exports = router;
