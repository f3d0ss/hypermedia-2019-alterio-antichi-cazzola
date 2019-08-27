const passport = require('passport');
const express = require('express');
const router = express.Router();

const reservationController = require('../controller/reservation');

router.get('/', reservationController.getReservations);

router.post('/', passport.authenticate('jwt', {
    session: false
}), reservationController.postReservation);

router.get('/user/:userId', reservationController.getReservationsByUser);

router.delete('/:reservationId', passport.authenticate('jwt', {
    session: false
}), reservationController.deleteReservation);


module.exports = router;