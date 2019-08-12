const express = require('express');
const router = express.Router();

const artisticFieldController = require('../controller/artistic_field');

router.get('/', artisticFieldController.getArtisticFields);

router.post('/', artisticFieldController.postArtisticField);

router.get('/:artisticFieldId', artisticFieldController.getArtisticFieldById);

module.exports = router;