const express = require('express');
const router = express.Router();

const performerRouter = require('./routes/performer');
const artisticFieldRouter = require('./routes/artistic_field');
const eventRouter = require('./routes/event');
const locationRouter = require('./routes/location');


router.use('/performer', performerRouter);
router.use('/artistic-field', artisticFieldRouter);
router.use('/event', eventRouter);
router.use('/location', locationRouter);


module.exports = router;