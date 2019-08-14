const express = require('express');
const router = express.Router();

const eventController = require('../controller/event');

router.get('/', eventController.getEvents);

router.post('/', eventController.postEvent);

router.get('/performer/:performerId', eventController.getEventsByPerformer);

router.get('/:eventId', eventController.getEventById);

module.exports = router;