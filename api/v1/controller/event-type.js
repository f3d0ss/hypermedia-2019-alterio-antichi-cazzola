const EventType = require('../../../models/event-type');

exports.getEventTypes = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const eventTypes = await EventType.getEventTypes(pageNumber, pageSize);
        res.status(200).json(eventTypes);
    } catch (error) {
        next(error);
    }
}

exports.getEventTypeById = async (req, res, next) => {
    const event_type = req.params.eventType;
    try {
        const eventType = await EventType.getEventTypeById(event_type);
        res.status(200).json(eventType);
    } catch (error) {
        next(error);
    }
}

exports.postEventType = async (req, res, next) => {
    const event_type = req.body.event_type;
    const description = req.body.description;
    try {
        const eventType = new EventType(event_type, description);
        await eventType.save();
        res.status(201).json(eventType);
    } catch (error) {
        next(error);
    }
}