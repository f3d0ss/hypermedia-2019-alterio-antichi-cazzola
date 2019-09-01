const express = require('express');
const router = express.Router();

const performerRouter = require('./routes/performer');
const eventTypeRouter = require('./routes/event-type');
const eventRouter = require('./routes/event');
const locationRouter = require('./routes/location');
const companyRouter = require('./routes/company');
const seminarRouter = require('./routes/seminar');
const authRouter = require('./routes/auth');
const reservationRouter = require('./routes/reservation');


router.use('/auth', authRouter);
router.use('/performer', performerRouter);
router.use('/event-type', eventTypeRouter);
router.use('/event', eventRouter);
router.use('/location', locationRouter);
router.use('/company', companyRouter);
router.use('/seminar', seminarRouter);
router.use('/reservation', reservationRouter);


module.exports = router;