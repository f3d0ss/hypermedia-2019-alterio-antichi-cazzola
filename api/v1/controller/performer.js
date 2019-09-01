const Performer = require('../../../models/performer');

exports.getPerformers = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const performers = await Performer.getPerformers(pageNumber, pageSize);
        res.status(200).json(performers);
    } catch (error) {
        next(error);
    }
}

exports.getPerformerById = async (req, res, next) => {
    const performerId = req.params.performerId;
    try {
        const performer = await Performer.getPerformerById(performerId);
        console.log(performer);
        res.status(200).json(performer);
    } catch (error) {
        next(error);
    }
}

exports.postPerformer = async (req, res, next) => {
    const name = req.body.name;
    const achivements = req.body.achivements;
    const detail = req.body.detail;
    const company_id = req.body.company_id;
    const photos = req.body.photos;
    try {
        const performer = new Performer(name, achivements, detail, company_id, photos);
        await performer.save();
        res.status(201).json(performer);
    } catch (error) {
        next(error);
    }
}

exports.getPerformersByEvent = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const eventId = req.params.eventId;
    try {
        const performers = await Performer.getPerformersByEvent(pageNumber, pageSize, eventId);
        res.status(200).json(performers);
    } catch (error) {
        next(error);
    }
}

exports.getPerformersByCompany = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    const companyId = req.params.companyId;
    try {
        const performers = await Performer.getPerformersByCompany(pageNumber, pageSize, companyId);
        res.status(200).json(performers);
    } catch (error) {
        next(error);
    }
}