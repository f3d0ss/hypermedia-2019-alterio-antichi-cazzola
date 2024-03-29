const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.render('home'));
router.get('/performers/:performerId', (req, res, next) => res.render('performer'));
router.get('/login', (req, res, next) => res.render('login'));
router.get('/registration', (req, res, next) => res.render('registration'));
router.get('/reservationInfo', (req, res, next) => res.render('reservationInfo'));
router.get('/performers', (req, res, next) => res.render('performerGroup'));
router.get('/companies', (req, res, next) => res.render('performerGroup'));
router.get('/companies/:id', (req, res, next) => res.render('company'));
router.get('/calendar', (req, res, next) => res.render('calendar'));
router.get('/eventsTypes', (req, res, next) => res.render('eventsTypes'));
router.get('/events/type/:type', (req, res, next) => res.render('eventsByType'));
router.get('/events/:id', (req, res, next) => res.render('artisticEvent'));
router.get('/contactUs', (req, res, next) => res.render('contactUs'));
router.get('/today', (req, res, next) => res.render('today'));
router.get('/seminars/:id', (req, res, next) => res.render('seminar'));
router.get('/seminars', (req, res, next) => res.render('seminars'));
router.get('/reservations', (req, res, next) => res.render('reservations'));

module.exports = router;