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
    const performer_ids = req.body.performer_ids;
    const company_ids = req.body.company_ids;
    const event_type = req.body.event_type

    try {
        const event = new Event(name, abstract, date, start, end, vacancy, location_id, seminar_id, performer_ids, company_ids, event_type);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}

exports.getEventsByPerformer = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const performerId = req.params.performerId;
    try {
        const events = await Event.getEventsByPerformer(pageNumber, pageSize, performerId);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventsByCompany = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const companyId = req.params.companyId;
    try {
        const events = await Event.getEventsByCompany(pageNumber, pageSize, companyId);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventsByLoction = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const locationId = req.params.locationId;
    try {
        const events = await Event.getEventsByLoction(pageNumber, pageSize, locationId);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventsByType = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const eventType = req.params.eventType;
    try {
        const events = await Event.getEventsByType(pageNumber, pageSize, eventType);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventsByDate = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const date = req.params.date;
    try {
        const events = await Event.getEventsByDate(pageNumber, pageSize, date);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

exports.getEventsBySeminar = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const seminarId = req.params.seminarId;
    try {
        const events = await Event.getEventsBySeminar(pageNumber, pageSize, seminarId);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}