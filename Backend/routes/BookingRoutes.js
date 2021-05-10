const express = require('express');

const router = express.Router();

const BookingController = require('../controllers/BookingController');

router.get('/', BookingController.Passindex);
router.post('/Passshow', BookingController.Passshow);
router.post('/Passstore', BookingController.Passstore);
router.post('/Passupdate', BookingController.Passupdate);
router.get('/Passdelete/:PassID', BookingController.Passdestroy);
router.get('/PassClear', BookingController.PassClear);

module.exports = router;
