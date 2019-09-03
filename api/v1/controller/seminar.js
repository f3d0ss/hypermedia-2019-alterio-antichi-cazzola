const Seminar = require('../../../models/seminar');

exports.getSeminars = async (req, res, next) => {
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
        const seminars = await Seminar.getSeminars(pageNumber, pageSize);
        res.status(200).json(seminars);
    } catch (error) {
        next(error);
    }
}

exports.getSeminarById = async (req, res, next) => {
    const seminarId = req.params.seminarId;
    try {
        const seminar = await Seminar.getSeminarById(seminarId);
        res.status(200).json(seminar);
    } catch (error) {
        next(error);
    }
}

exports.postSeminar = async (req, res, next) => {
    const title = req.body.title;
    const abstract = req.body.abstract;
    const date = req.body.date;
    const start = req.body.start;
    const end = req.body.end;
    const location_id = req.body.location_id;
    const vacancy = req.body.vacancy;

    try {
        const seminar = new Seminar(title, abstract, location_id, date, start, end, vacancy);
        await seminar.save();
        res.status(201).json(seminar);
    } catch (error) {
        next(error);
    }
}