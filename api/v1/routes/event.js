const express = require('express');
const router = express.Router();

const eventController = require('../controller/event');

router.get('/', eventController.getEvents);

router.post('/', eventController.postEvent);

router.get('/performer/:performerId', eventController.getEventsByPerformer);

router.get('/company/:companyId', eventController.getEventsByCompany);

router.get('/location/:locationId', eventController.getEventsByLoction);

router.get('/date/:date', eventController.getEventsByDate);

router.get('/seminar/:seminarId', eventController.getEventsBySeminar);

router.get('/type/:eventType', eventController.getEventsByType);

router.get('/:eventId', eventController.getEventById);

module.exports = router;