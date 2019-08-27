const express = require('express');
const router = express.Router();

const performerController = require('../controller/performer');

router.get('/', performerController.getPerformers);

router.post('/', performerController.postPerformer);

router.get('/event/:eventId', performerController.getPerformersByEvent);

router.get('/company/:companyId', performerController.getPerformersByCompany);

router.get('/:performerId', performerController.getPerformerById);

module.exports = router;