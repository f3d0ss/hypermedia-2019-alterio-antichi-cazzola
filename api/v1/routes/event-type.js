const express = require('express');
const router = express.Router();

const eventTypeController = require('../controller/event-type');

router.get('/', eventTypeController.getEventTypes);

router.post('/', eventTypeController.postEventType);

router.get('/:eventType', eventTypeController.getEventTypeById);

module.exports = router;