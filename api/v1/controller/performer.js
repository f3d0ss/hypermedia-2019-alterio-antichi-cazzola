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
    const main_field = req.body.main_field;
    const photos = req.body.photos;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    try {
        const performer = new Performer(name, achivements, detail, company_id, main_field, photos);
        await performer.save();
        res.status(201).json(performer);
    } catch (error) {
        next(error);
    }
}