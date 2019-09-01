const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.render('home'));
router.get('/performer', (req, res, next) => res.render('performer'));
router.get('/event', (req, res, next) => res.render('artisticEvent'));
router.get('/login', (req, res, next) => res.render('login'));
router.get('/registration', (req, res, next) => res.render('registration'));
router.get('/performers', (req, res, next) => res.render('performerGroup'));
router.get('/calendar', (req, res, next) => res.render('calendar'));
router.get('/eventsTypes', (req, res, next) => res.render('eventsTypes'));
router.get('/events/type/:type', (req, res, next) => res.render('eventsByType'));
router.get('/contactUs', (req, res, next) => res.render('contactUs'));

module.exports = router;