const express = require('express');
const router = express.Router();

const locationController = require('../controller/location');

router.get('/', locationController.getLocations);

router.post('/', locationController.postLocation);

router.get('/:locationId', locationController.getLocationById);

module.exports = router;