const express = require('express');
const router = express.Router();

const seminarController = require('../controller/seminar');

router.get('/', seminarController.getSeminars);

router.post('/', seminarController.postSeminar);

router.get('/:seminarId', seminarController.getSeminarById);

module.exports = router;