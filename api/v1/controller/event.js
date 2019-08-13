const Event = require('../../../models/event');

exports.getEvents = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const events = await Event.getEvents(pageNumber, pageSize);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventById = async (req, res, next) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.getEventById(eventId);
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}

exports.postEvent = async (req, res, next) => {
    const name = req.body.name;
    const abstract = req.body.abstract;
    const date = req.body.date;
    const start = req.body.start;
    const end = req.body.end;
    const vacancy = req.body.vacancy;
    const location_id = req.body.location_id;
    const seminar_id = req.body.seminar_id;

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    try {
        const event = new Event(name, abstract, date, start, end, vacancy, location_id, seminar_id);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}