const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.render('home'));
router.get('/performer', (req, res, next) => res.render('performer'));
router.get('/event', (req, res, next) => res.render('artisticEvent'));
router.get('/login', (req, res, next) => res.render('login'));
router.get('/registration', (req, res, next) => res.render('registration'));
router.get('/performerGroup', (req, res, next) => res.render('performerGroup'));

module.exports = router;