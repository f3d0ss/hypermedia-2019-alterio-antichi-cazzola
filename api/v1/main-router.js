const express = require('express');
const router = express.Router();

const performerRouter = require('./routes/performer');
const artisticFieldRouter = require('./routes/artistic_field');
const eventRouter = require('./routes/event');
const locationRouter = require('./routes/location');
const companyRouter = require('./routes/company');
const seminarRouter = require('./routes/seminar');
const authRouter = require('./routes/auth');


router.use('/performer', performerRouter);
router.use('/artistic-field', artisticFieldRouter);
router.use('/event', eventRouter);
router.use('/location', locationRouter);
router.use('/company', companyRouter);
router.use('/seminar', seminarRouter);
router.use('/auth', authRouter);


module.exports = router;