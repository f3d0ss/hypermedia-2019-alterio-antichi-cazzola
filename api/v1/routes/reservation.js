const express = require('express');
const router = express.Router();

const reservationController = require('../controller/reservation');

router.get('/', reservationController.getReservations);

router.post('/', reservationController.postReservation);

router.get('/user/:userId', reservationController.getReservationsByUser);

router.delete('/:reservationId', reservationController.deleteReservation);


module.exports = router;