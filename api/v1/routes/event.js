const express = require('express');
const router = express.Router();

const eventController = require('../controller/event');

router.get('/', eventController.getEvents);

router.post('/', eventController.postEvent);

router.get('/:eventId', eventController.getEventById);

module.exports = router;