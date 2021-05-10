const express = require('express');

const router = express.Router();

const Credentials = require('../controllers/CredentialsController');

router.post('/Login', Credentials.Login);
router.post('/SignUp', Credentials.SignUp);
router.get('/Delete/:UserID', Credentials.Destroy);
router.get('/MyBooking/:UserID', Credentials.ShowTickets);
router.get('/Profile/:UserID', Credentials.ShowUser);
router.put('/Update', Credentials.Update);
router.get('/', Credentials.Index);

module.exports = router;
